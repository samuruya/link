import { View, Text, Image, TextInput, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import Spacing from '../../comp/spacing';
import { Colors } from '../../constants/colors';
import Button from '../../comp/button';
import Logo from '../../comp/logo';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, onRegister } = useAuth();
    const [isLoginMode, setIsLoginMode] = useState(true);

    const toggleMode = () => {
        setIsLoginMode((prevMode) => !prevMode);
    };

    const login = async () => {
        const res = await onLogin!(email, password);
        if(res && res.error) {
            alert(res.msg)
        } 
    }

    const register = async () => {
        const res = await onRegister!(email, password);
        if(res && res.error) {
            alert(res.msg)
        } else {
            login()
        }
    }

    return (
        <View>

          <View style={styles.body}>
            <Logo large={true}></Logo>
            {isLoginMode ? (
              <View style={styles.form}>
                <Text style={styles.areaT}>Login</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <Button onPress={login} text='Login'/>
              </View>
            ) : (
              <View style={styles.form}>
                <Text style={styles.areaT}>Register</Text>
                {/* Additional fields for registration, if needed */}
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <Button onPress={register} text='Sign Up'/>
              </View>
            )}
            <View style={styles.buttonContainer}>
              <Button text={isLoginMode ? 'Im New' : 'Im Returning'} onPress={toggleMode} />
            </View>
          </View>
        </View>
      );
}
const styles = StyleSheet.create({
    body: {
        marginTop: '20%',
        height: '90%',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20
    },
    form: {
        justifyContent: 'center',
        margin: 20
    },
    areaT: {
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        fontSize: 30
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: Colors.secondary,
        borderRadius: 20
    },
    inputb: {
        margin: 20,
        padding: 10,
        backgroundColor: Colors.primary,
        borderRadius: 20
    }
})
export default Login