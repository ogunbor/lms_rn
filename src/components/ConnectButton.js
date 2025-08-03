import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { getPublicKeyFromAddress } from '../utils/solana.js';


export const APP_IDENTITY = {
    name: 'lms_RN',
};

export default function ConnectButton({ onConnect }) {
    const onPress = async () => {
        await transact(async (wallet) => {
            const authResult = await wallet.authorize({
                cluster: 'devnet',
                identity: APP_IDENTITY,
            });

            const { accounts, auth_token } = authResult;
            const publicKey = getPublicKeyFromAddress(accounts[0].address);

            onConnect({
                address: accounts[0].address,
                label: accounts[0].label,
                authToken: auth_token,
                publicKey: publicKey,
            });
        });
    };

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Connect Wallet</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
