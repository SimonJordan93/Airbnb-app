import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Airbnb</Text>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ff5a5f",
  },
  formContainer: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#ffffff",
  },
  input: {
    height: 50,
    backgroundColor: "#f2f2f2",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#ff5a5f",
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
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
