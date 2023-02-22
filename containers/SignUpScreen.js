import { useState } from "react";
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

const SignUpScreen = ({ setToken }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!email || !username || !description || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all the fields");
    } else if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
    } else {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
          {
            email,
            username,
            description,
            password,
          }
        );
        if (response.data.token) {
          setToken(response.data.token);
          Alert.alert("Success", "Registration successful!");
        } else {
          Alert.alert("Error", "Registration failed. Please try again.");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Registration failed. Please try again.");
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
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          multiline
          numberOfLines={4}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.signInText}>
            Already have an account?{" "}
            <Text style={styles.signInLink}>Sign in</Text>
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

export default SignUpScreen;
