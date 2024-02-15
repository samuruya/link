import { View, Text, Image, TextInput, StyleSheet, Dimensions, Modal, BackHandler, Keyboard, ScrollView, Linking } from 'react-native';  
import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import Spacing from '../../comp/spacing';
import { Colors } from '../../constants/colors';
import Button from '../../comp/button';
import Logo from '../../comp/logo';
import { FontAwesome } from '@expo/vector-icons';

    const width = Dimensions.get('window').width; 
    const height = Dimensions.get('window').height;
    const website = 'www.google.com' /*change link later*/




const Login = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ent, setEnt] = useState('')
    const { onLogin, onRegister } = useAuth();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [showPop, setShowPop] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#fff');
    const [keyboardOffset, setKeyboardOffset] = useState(0);


    const toggleMode = () => {
        setIsLoginMode((prevMode) => !prevMode);
    };
    
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        (event) => {
          setKeyboardOffset(event.endCoordinates.height);
        }
      );
    
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardOffset(0);
        }
      );
    
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    useEffect(() => {
      if(showPop == true) {
        setBackgroundColor('#000')
      } else {
        setBackgroundColor('#fff')
      }
    }, [showPop]);

    const popup = () => {
      setShowPop((prevMode) => !prevMode);
    };

    const openWeb = () => {
      Linking.openURL(website)
    }


    const login = async () => {
        const res = await onLogin!(email, password);
        if(res && res.error) {
            alert(res.msg)
        } 
    }

    const register = async () => {
        const res = await onRegister!(name, email, password, ent);
        if(res && res.error) {
            alert(res.msg)
        } else {
            login()
        }
    }

    return (
      
      <ScrollView
      style={{
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20 + keyboardOffset,
        backgroundColor: backgroundColor,
      }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
          <Modal
            animationType="slide"
            transparent={true}
            visible={showPop}
            onRequestClose={() => {
              setShowPop(false);
            }}>
              <View style={styles.popwrap}>
                <View style={styles.popup}>
                  <View style={{
                    width: '100%',
                  }}>
                    <Button onPress={popup}> 
                      <FontAwesome name="close" size={24} color="black" />
                    </Button>
                  </View>
                  <View>
                    <Text style={styles.pop_title}>
                      How to get a Beta Key ?
                    </Text>
                    <Text>
                      All you have to do to get a beta key is to register for the beta testing phase on our website: 
                      <Text onPress={openWeb} style={{color: Colors.primary}}>
                        LinkUp.com
                      </Text>.
                      We continue to add more testers weekly to check the viabilty and 
                    </Text>
                  </View>
                </View>
              </View>

          </Modal>

          <View style={styles.body}>
            <View>
              <Logo large={true}></Logo>
              <Text style={styles.areaT}>{isLoginMode ? 'Login' : 'Register'}</Text>
            </View>
            {isLoginMode ? (
              <View style={styles.form}>
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
                <TextInput
                  style={styles.input}
                  placeholder="Beta Token"
                  secureTextEntry
                  value={ent}
                  onChangeText={(text) => setEnt(text)}
                />
                <Button onPress={register} text='Sign Up'/>
              </View>
            )}
            <View style={styles.buttonContainer}>
              <Button text={isLoginMode ? 'Im New' : 'Im Returning'} onPress={toggleMode} />
              {isLoginMode ? (
                <View></View>
              ) : (
                <View>
                    <Button onPress={popup} text={'Beta Token Info'}></Button>
                </View>
              )}
            </View>
          </View>
          </ScrollView>
      );
}
const styles = StyleSheet.create({
    body: {

        height: height,
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,

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
        gap: 20,
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
    },
    change: {
      bottom: 20,
      position: 'absolute'
    },
    infoWrap: {
      flexDirection: 'row'
    },
    info: {
      width: '10%'
    },
    popwrap: {
      width: width,
      height: height,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    popup: {
      borderRadius: 20,
      margin: 20,
      width: '90%',
      height: '90%',
      backgroundColor: Colors.background

    },
    close: {
      margin: 20
    },
    pop_title: {
      textAlign: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      fontSize: 30
    }
  })
export default Login