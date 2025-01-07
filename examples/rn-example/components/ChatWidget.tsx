import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useChatContext } from '../hooks/useChatContext';
import { BotMessageType, MessageType } from '@opencx/widget';
import { usePubsub } from '../hooks/usePubsub';

export const ChatWidget = () => {
    const [messageInput, setMessageInput] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);
    const { chat, prelude, isLoading } = useChatContext();

    const chatState = usePubsub(chat.chatState);

    const handleSendMessage = async () => {
        if (!messageInput.trim()) return;

        try {
            const success = await chat.sendMessage({
                content: messageInput,
            });

            if (success) {
                setMessageInput('');
                // Scroll to bottom after message is sent
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const handleQuestionPress = (question: string) => {
        setMessageInput(question);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    {prelude?.organizationName || 'Chat Assistant'}
                </Text>
            </View>

            <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                {!chatState?.messages.length && prelude?.initialQuestions && (
                    <View style={styles.initialQuestionsContainer}>
                        <Text style={styles.welcomeText}>
                            Welcome! Here are some questions you can ask:
                        </Text>
                        {prelude.initialQuestions.map((question, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.questionButton}
                                onPress={() => handleQuestionPress(question)}
                            >
                                <Text style={styles.questionText}>{question}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {chatState?.messages.map((message: MessageType, index: number) => (
                    <View
                        key={message.id}
                        style={[
                            styles.messageContainer,
                            message.type === 'FROM_USER'
                                ? styles.userMessage
                                : styles.botMessage,
                        ]}
                    >
                        <Text style={styles.messageText}>
                            {message.type === 'FROM_USER'
                                ? message.content
                                : (message as BotMessageType<{ message: string }>).data.message}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={messageInput}
                    onChangeText={setMessageInput}
                    placeholder="Type your message..."
                    placeholderTextColor="#666"
                    multiline
                    maxLength={1000}
                    returnKeyType="send"
                    onSubmitEditing={handleSendMessage}
                    editable={!chatState?.loading.isLoading}
                />
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        chatState?.loading.isLoading && styles.sendButtonDisabled,
                    ]}
                    onPress={handleSendMessage}
                    disabled={chatState?.loading.isLoading}
                >
                    {chatState?.loading.isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.sendButtonText}>Send</Text>
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContent: {
        padding: 16,
    },
    initialQuestionsContainer: {
        marginBottom: 16,
    },
    welcomeText: {
        fontSize: 16,
        marginBottom: 12,
        color: '#666',
    },
    questionButton: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    questionText: {
        color: '#2b6cb0',
    },
    messageContainer: {
        maxWidth: '80%',
        marginBottom: 12,
        padding: 12,
        borderRadius: 12,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#2b6cb0',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        marginRight: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        fontSize: 16,
        maxHeight: 100,
    },
    sendButton: {
        backgroundColor: '#2b6cb0',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    sendButtonDisabled: {
        backgroundColor: '#93c5fd',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 