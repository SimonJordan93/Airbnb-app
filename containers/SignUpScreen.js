import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Image,
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
    <KeyboardAwareScrollView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/img/airbnb.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.screenTitle}>Sign up</Text>
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
          style={styles.description}
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          multiline
          numberOfLines={8}
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
        <TouchableHighlight
          style={styles.button}
          underlayColor="#ff5a5f"
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.signInText}>
            Already have an account?{" "}
            <Text style={styles.signInLink}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
  description: {
    width: "100%",
    height: 100,
    marginBottom: 20,
    borderColor: "#ff5a5f",
    borderWidth: 1,
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

export default SignUpScreen;
