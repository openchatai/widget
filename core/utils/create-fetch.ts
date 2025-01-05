type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;
type ErrorInterceptor = (error: any) => any;

interface RequestConfig extends RequestInit {
    baseURL?: string;
    headers?: HeadersInit;
    params?: Record<string, string>;
}

export interface CustomFetch {
    (url: string, config?: RequestConfig): Promise<Response>;
    interceptors: {
        request: {
            use: (interceptor: RequestInterceptor) => number;
            eject: (id: number) => void;
        };
        response: {
            use: (interceptor: ResponseInterceptor, errorInterceptor?: ErrorInterceptor) => number;
            eject: (id: number) => void;
        };
    };
}

export function createFetch(defaultConfig: RequestConfig = {}): CustomFetch {
    const requestInterceptors: RequestInterceptor[] = [];
    const responseInterceptors: ResponseInterceptor[] = [];
    const errorInterceptors: ErrorInterceptor[] = [];

    const customFetch: CustomFetch = async (url: string, config: RequestConfig = {}) => {
        // Merge configs
        let mergedConfig: RequestConfig = {
            ...defaultConfig,
            ...config,
            headers: {
                ...defaultConfig.headers,
                ...config.headers,
            },
        };

        try {
            // Apply request interceptors
            for (const interceptor of requestInterceptors) {
                mergedConfig = await interceptor(mergedConfig);
            }

            // Handle URL params
            const queryParams = mergedConfig.params
                ? '?' + new URLSearchParams(mergedConfig.params).toString()
                : '';

            // Construct full URL
            const fullUrl = mergedConfig.baseURL
                ? `${mergedConfig.baseURL}${url}${queryParams}`.replace(/([^:]\/)\/+/g, '$1')
                : `${url}${queryParams}`;

            // Make the fetch call
            let response = await fetch(fullUrl, mergedConfig);

            // Apply response interceptors
            for (const interceptor of responseInterceptors) {
                response = await interceptor(response);
            }

            return response;
        } catch (error) {
            // Apply error interceptors
            let processedError = error;
            for (const interceptor of errorInterceptors) {
                processedError = await interceptor(processedError);
            }
            throw processedError;
        }
    };

    // Add interceptors management
    customFetch.interceptors = {
        request: {
            use: (interceptor: RequestInterceptor) => {
                requestInterceptors.push(interceptor);
                return requestInterceptors.length - 1;
            },
            eject: (id: number) => {
                requestInterceptors.splice(id, 1);
            },
        },
        response: {
            use: (interceptor: ResponseInterceptor, errorInterceptor?: ErrorInterceptor) => {
                responseInterceptors.push(interceptor);
                if (errorInterceptor) {
                    errorInterceptors.push(errorInterceptor);
                }
                return responseInterceptors.length - 1;
            },
            eject: (id: number) => {
                responseInterceptors.splice(id, 1);
                errorInterceptors.splice(id, 1);
            },
        },
    };

    return customFetch;
}

// Helper method to handle JSON responses
export async function handleJsonResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// Usage example:
/*
const api = createFetch({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'Authorization': `Bearer ${getToken()}`,
  };
  return config;
});

// Add response interceptor
api.interceptors.response.use(
  async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  },
  (error) => {
    console.error('Request failed:', error);
    throw error;
  }
);
*/
