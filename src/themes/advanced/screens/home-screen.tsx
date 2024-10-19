import { motion } from 'framer-motion';
import { Bot, Send } from 'lucide-react';
import { Link } from 'wouter';
import { SizableScreenContainer } from '../WidgetPopoverContent';
import styled from 'styled-components';

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
    color: #111827;
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
    gap: 15px;
`;

const Main = styled.main`
    flex: 1;
`;

const Footer = styled.footer`
    padding: ${props => props.theme.spacing.md};
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: ${props => props.theme.radii.lg}; /* rounded-lg */
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
    font-size: ${props => props.theme.fs.md};
    transition: background-color 0.3s, filter 0.3s;
    
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.foreground}; 
    font-weight: 600;
    &:hover {
        filter: brightness(110%); /* hover:brightness-110 */
    }
`;

const SendContainer = styled.div`
    display: flex;
    margin-left: auto;
    align-items: center;
    justify-content: center;
    height: 1.5rem; 
`;

export function HomeScreen() {
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
            {/* Past conversations */}
            <Main>

            </Main>

            <Footer>
                <StyledLink
                    to='/chat/sessionid'
                >
                    <span>
                        start a conversation
                    </span>
                    <SendContainer>
                        <Send className='size-4' />
                    </SendContainer>
                </StyledLink>
            </Footer>
        </AnimatedHomeScreenContainer>
    );
}
