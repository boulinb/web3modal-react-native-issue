# Web3Modal - React Native Implementation Test

## Tested On :

- Node : 16.10.0
- Expo-cli : 6.1.0
- Expo : 48.0.6
- React : 18.2.0
- React-Native : 0.71.3

## Issues :

- When the modal opens, the wallets are not listed (infinite loading)
- After connecting to the wallet, when the user tries to sign a transaction ('personal_sign') on TrustWallet, an error message is returned: 'Failed to decrypt'. It is likely that this bug is directly linked to the warning received in the console indicating a problem with the topic: "No matching key".

