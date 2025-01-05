import { useState, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { ConsumerType } from '../../core';
import usePubsub from './usePubsub';

export const useContact = () => {
    const { contact } = useChat();
    const contactState = usePubsub(contact.contactState);

    return {
        contactState,
    };
}; 