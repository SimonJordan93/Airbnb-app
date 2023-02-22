import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import axios from "axios";

const SignInScreen = ({ setToken }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all the fields");
    } else {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          {
            email,
            password,
          }
        );
        if (response.data.token) {
          setToken(response.data.token);
          Alert.alert("Success", "Login successful!");
        } else {
          Alert.alert("Error", "Login failed. Please try again.");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Login failed. Please try again.");
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/img/airbnb.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.screenTitle}>Sign in</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signInText}>
            No account? <Text style={styles.signInLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  logo: {
    marginTop: 20,
    marginBottom: 20,
    height: 100,
    width: 100,
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#666",
  },
  formContainer: {
    // backgroundColor: "black",
    padding: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 20,
    borderBottomColor: "#ff5a5f",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 50,
    width: "50%",
    backgroundColor: "#FFF",
    borderColor: "#ff5a5f",
    borderWidth: 3,
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonText: {
    textAlign: "center",
    color: "#666",
    fontWeight: "700",
  },
  signInText: {
    textAlign: "center",
    marginTop: 20,
    color: "#484848",
  },
  signInLink: {
    color: "#ff5a5f",
    fontWeight: "700",
  },
});

export default SignInScreen;
