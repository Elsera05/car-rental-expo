import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function step3() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invoice</Text>
      
      <View style={styles.invoiceNumberContainer}>
        <Text style={styles.invoiceNumber}>INV/xx/xx-xxxx/</Text>
        <TouchableOpacity>
          <Feather name="download" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.subtitle}>E-Tiket</Text>
      
      <View style={styles.pdfViewerContainer}>
        <Feather name="file" size={48} color="gray" />
        <Text style={styles.pdfViewerText}>PDF Viewer</Text>
      </View>
      
      <Text style={styles.instructions}>
        Tunjukkan tiket ini ke petugas JBO di pos penjemputan Anda.
      </Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Lihat Daftar Pesanan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  invoiceNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  invoiceNumber: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pdfViewerContainer: {
    height: 200,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  pdfViewerText: {
    marginTop: 8,
    color: 'gray',
  },
  instructions: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});