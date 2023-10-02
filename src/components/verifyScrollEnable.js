import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const verifyScrollEnable = ({ onKeyboardStatusChange }) => {
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardOpen(true);
                if (onKeyboardStatusChange) {
                    onKeyboardStatusChange(true);
                }
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardOpen(false);
                if (onKeyboardStatusChange) {
                    onKeyboardStatusChange(false);
                }
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [onKeyboardStatusChange]);

    return null; // Este componente não renderiza nenhum UI
}

export default verifyScrollEnable;