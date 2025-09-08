import React, {useEffect, useState} from 'react';
import {Buffer} from 'buffer';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  DataDome,
  DataDomeModal,
  DataDomeFetch,
} from '@datadome/react-native-datadome';

const API_KEY = '';
const ENDPOINT = '';
const EMAIL = '';
const PASSWORD = '';

const App = () => {
  const [status, setStatus] = useState('Idle');

  useEffect(() => {
    DataDome.getInstance().setSdkKey(API_KEY);
    DataDome.getInstance().enableVerboseLogs(true);
    console.log('Datadome Initialized');
  }, []);

  const login = async () => {
    setStatus('Loading...');

    try {
      const basic = Buffer.from(`${EMAIL}:${PASSWORD}`).toString('base64');
      const response = await DataDomeFetch(ENDPOINT, {
        method: 'POST',
        headers: new Headers({
          'User-Agent': 'THEFORK-DATADOME-BLOCK',
          Authorization: 'Basic ' + basic,
        }),
        datadome: true,
        credentials: 'include',
      });

      if (response.ok) {
        setStatus('Success!');
      } else {
        setStatus(`Failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      if (error && typeof error === 'object' && 'message' in error) {
        setStatus(`Error: ${error.message}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <DataDomeModal
        onRef={ref => DataDome.getInstance().setContainerViewRef(ref)}
      />
      <Text style={styles.status}>Status: {status}</Text>

      <TouchableOpacity onPress={login} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
