//import './expo-crypto-shim.js'
import "fast-text-encoding";
import "@walletconnect/react-native-compat";
import { Pressable, StyleSheet, Text, View} from "react-native";
import { registerRootComponent } from "expo";
import {Web3Modal, useWeb3Modal} from '@web3modal/react-native';

import useInitialization, { ENV_PROJECT_ID } from "../utils/WalletConnectUtils";
import React from "react";
import { EIP155_SIGNING_METHODS } from "../utils/EIP155Lib";
import {useSnapshot} from "valtio";
import {AccountCtrl} from "@web3modal/react-native/src/controllers/AccountCtrl";

export default function App() {
  useInitialization();

  const { open, isConnected, provider, isOpen, close } = useWeb3Modal();

  const accountState = useSnapshot(AccountCtrl.state);

  const getLoginSignatureModel = (account, nonce) => {
    const signatureModel =
        "Welcome to MyApp!\n" +
        "\n" +
        "Click to sign in and accept the MyApp Terms of Service.\n" +
        "\n" +
        "This request will not trigger a blockchain transaction or cost any gas fees.\n" +
        "\n" +
        "Wallet address:\n" +
        `${account}\n` +
        "\n" +
        "Nonce:\n" +
        nonce

    return signatureModel;
  }

  const onSignReq = async () => {
    if (isConnected) {
      try {
        const MY_ACCOUNT = '0x0000...';

        const res = await provider.request({
          method: EIP155_SIGNING_METHODS.PERSONAL_SIGN,
          params: [getLoginSignatureModel(MY_ACCOUNT, '12345'), MY_ACCOUNT]
        }, 'eip155:1');

        console.log('res : ', res);
      } catch (e) {
        console.log('catch req : ', e);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Web3Wallet Tutorial</Text>
        <Text style={styles.addressContent}>
          ETH Address: {accountState.address ? accountState.address : "Loading..."}
        </Text>

        <Pressable style={{marginTop: 32 }} onPress={() => open()}>
          <Text>{'Open Modal'}</Text>
        </Pressable>

        <Pressable style={{marginTop: 32 }} onPress={onSignReq}>
          <Text>{'sign'}</Text>
        </Pressable>
      </View>
      <Web3Modal projectId={ENV_PROJECT_ID}  providerMetadata={{
        name: 'AppName',
        description: 'AppDescription',
        url: 'https://appUrl.com',
        icons: ['https://appImage.com']
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 34,
    borderWidth: 1,
    width: "100%",
    height: "40%",
    position: "absolute",
    bottom: 0,
  },
  textInputContainer: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    padding: 4,
  },
  addressContent: {
    textAlign: "center",
    marginVertical: 8,
  },
});

registerRootComponent(App);
