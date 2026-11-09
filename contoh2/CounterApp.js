// Contoh jawaban Soal 2: Counter dengan useState
// Untuk mencoba: ganti isi App.js dengan  `export { default } from './contoh/CounterApp';`
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CounterApp() {
  const [count, setCount] = useState(0);

  const tambah = () => setCount((prev) => prev + 1);
  const kurang = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplikasi Counter</Text>
      <Text style={[styles.angka, count < 0 && { color: '#DC2626' }]}>{count}</Text>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#EF4444' }]} onPress={kurang}>
          <Text style={styles.btnText}>− Kurang</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#6B7280' }]} onPress={reset}>
          <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#10B981' }]} onPress={tambah}>
          <Text style={styles.btnText}>+ Tambah</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  angka: { fontSize: 72, fontWeight: '800', color: '#4F46E5', marginBottom: 24 },
  row: { flexDirection: 'row', gap: 10 },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10 },
  btnText: { color: '#fff', fontWeight: '700' },
});
