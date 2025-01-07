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
    SafeAreaView,
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
            <SafeAreaView style={styles.loadingContainer}>
                <View style={styles.loadingContent}>
                    <ActivityIndicator size="large" color="#2b6cb0" />
                    <Text style={styles.loadingTitle}>Initializing Chat</Text>
                    <Text style={styles.loadingText}>Loading organization details...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.headerTitle}>
                            {prelude?.organizationName || 'Chat Assistant'}
                        </Text>
                        {chatState?.loading.isLoading && (
                            <ActivityIndicator size="small" color="#2b6cb0" style={styles.headerLoader} />
                        )}
                    </View>
                    <View style={styles.connectionStatus}>
                        <View style={[styles.statusDot, { backgroundColor: chatState?.loading.isLoading ? '#f59e0b' : '#10b981' }]} />
                        <Text style={styles.statusText}>
                            {chatState?.loading.isLoading ? 'Processing...' : 'Ready'}
                        </Text>
                    </View>
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
                                👋 Welcome to {prelude.organizationName}!
                            </Text>
                            <Text style={styles.suggestionsText}>
                                Here are some questions you can ask:
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
                            <Text
                                style={[
                                    styles.messageText,
                                    message.type === 'FROM_USER' && styles.userMessageText,
                                ]}
                            >
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
                            !messageInput.trim() && styles.sendButtonDisabled,
                        ]}
                        onPress={handleSendMessage}
                        disabled={chatState?.loading.isLoading || !messageInput.trim()}
                    >
                        {chatState?.loading.isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.sendButtonText}>Send</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
    keyboardView: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2d3748',
        marginTop: 20,
        marginBottom: 8,
    },
    loadingText: {
        fontSize: 16,
        color: '#4a5568',
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    headerLoader: {
        marginLeft: 8,
    },
    messagesContainer: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
    messagesContent: {
        padding: 16,
    },
    initialQuestionsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2d3748',
    },
    suggestionsText: {
        fontSize: 16,
        marginBottom: 16,
        color: '#4a5568',
    },
    questionButton: {
        backgroundColor: '#edf2f7',
        padding: 14,
        borderRadius: 10,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    questionText: {
        color: '#2b6cb0',
        fontSize: 15,
        fontWeight: '500',
    },
    messageContainer: {
        maxWidth: '85%',
        marginBottom: 12,
        padding: 14,
        borderRadius: 16,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#2b6cb0',
        borderBottomRightRadius: 4,
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    messageText: {
        fontSize: 15,
        color: '#2d3748',
        lineHeight: 20,
    },
    userMessageText: {
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        marginRight: 12,
        padding: 12,
        backgroundColor: '#f7f9fc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        fontSize: 15,
        maxHeight: 100,
        color: '#2d3748',
    },
    sendButton: {
        backgroundColor: '#2b6cb0',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    sendButtonDisabled: {
        backgroundColor: '#93c5fd',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    connectionStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f7f9fc',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 13,
        color: '#4a5568',
        fontWeight: '500',
    },
}); 