import { Bot, Send } from 'lucide-react';
import { Link } from 'wouter';
import { SizableScreenContainer } from '../WidgetPopoverContent';
import styled from 'styled-components';
import { size } from 'src/design-helpers';
import { useConsumer } from '@lib/providers';
import { formatDistanceToNow } from 'date-fns';
import clr from "tinycolor2";

const HeaderContainer = styled.header`
    padding: 0.5rem; /* p-2 */
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    [data-hero] {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
`;

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const BotContainer = styled.div`
    width: 3rem; /* size-12 */
    height: 3rem; /* size-12 */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.75rem; /* rounded-xl */
    border: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.primary};
    overflow: hidden;
    padding: 0; /* p-0 */
`;

const Heading = styled.h2`
    font-size: 1.125rem;
    font-weight: 600;
`;

const Paragraph = styled.p`
    font-size: 0.75rem;
    color: ${props => props.theme.colors.secondary}; 
`;

const AnimatedHomeScreenContainer = styled(SizableScreenContainer)`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
    gap: 10px;
`;

const Main = styled.main`
    flex: 1;
    [data-conversations-title]{
        font-size:  ${props => props.theme.fs.sm};
        font-weight: 700;
        text-transform: uppercase;
        padding-inline: ${props => props.theme.spacing.md};
    }
`;

const Footer = styled.footer`
    padding: ${props => props.theme.spacing.md};
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: ${props => props.theme.radii.lg};
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
    font-size: ${props => props.theme.fs.md};
    transition: background-color 0.3s, filter 0.3s;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.foreground}; 
    font-weight: 500;

    &:hover {
        filter: brightness(110%); 
    }
    
    [data-send-icon]{
        transition: transform .7s ease-in-out;
        ${size("24px")}
    }
    &:hover {
        [data-send-icon]{
            transform: translate(30px, -30px);
        }
    }
`;

const SendContainer = styled.div`
    display: flex;
    margin-left: auto;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
`;


const ConversationCard = styled(Link)`
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.radii.lg};
    color: ${props => props.theme.colors.secondary};
    transition: background-color 0.3s;
    width: 100%;
    border: 1px solid ${props => props.theme.colors.border};
    background-color: ${props => props.theme.colors.background};

    &:hover {
        background-color: ${props => clr(props.theme.colors.background).darken(2).toString("hex")};
    }
`

const ConversationsContainer = styled.div`
    padding: ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.sm};
    width: 100%;
    display: flex;
    align-items: start;
    flex-direction: column;
    overflow: auto;
    max-height: 250px;

    h2 {
        font-size:  ${props => props.theme.fs.xs};
        font-weight: 700;
        text-transform: uppercase;
    }
`

export function HomeScreen() {
    const consumer = useConsumer()
    return (
        <AnimatedHomeScreenContainer
            animate={{
                x: 0,
                opacity: 1,
            }}
            exit={{
                x: "-10px",
                opacity: 0,
            }}
        >
            <HeaderContainer>
                <HeaderContent>
                    <BotContainer>
                        <Bot className='size-6' />
                    </BotContainer>
                </HeaderContent>
                <div data-hero>
                    <Heading>Welcome!</Heading>
                    <Paragraph>
                        How can we help!
                    </Paragraph>
                </div>
            </HeaderContainer>
            <Main>
                <h2 data-conversations-title>
                    Conversations
                </h2>
                <ConversationsContainer>
                    {
                        consumer.conversationsSWR.data?.map((conversation) => {
                            const { last_message_at, created_at } = conversation;
                            return <ConversationCard to={`/chat/${conversation.id}`} key={conversation.id}>
                                <h3>
                                    {conversation.summary}
                                </h3>
                                <p>
                                    {conversation.last_message}
                                </p>
                                <span>
                                    {!last_message_at && (
                                        <>
                                            <span>Created</span>
                                            <br />
                                        </>
                                    )}
                                    <span>
                                        {formatDistanceToNow(new Date(last_message_at || created_at), {
                                            addSuffix: true,
                                        })}
                                    </span>
                                </span>
                            </ConversationCard>
                        })
                    }
                </ConversationsContainer>
            </Main>
            <Footer>
                <StyledLink
                    to='/chat/sessionid'
                >
                    <span>
                        start a conversation
                    </span>
                    <SendContainer>
                        <Send data-send-icon />
                    </SendContainer>
                </StyledLink>
            </Footer>
        </AnimatedHomeScreenContainer>
    );
}
