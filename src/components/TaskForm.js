import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TaskForm({ form, onChangeField, onSubmit, namaInputRef, error }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Tugas Baru</Text>

      <TextInput
        ref={namaInputRef}
        style={styles.input}
        placeholder="Nama tugas"
        placeholderTextColor="#9CA3AF"
        value={form.nama}
        onChangeText={(text) => onChangeField('nama', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mata kuliah"
        placeholderTextColor="#9CA3AF"
        value={form.mataKuliah}
        onChangeText={(text) => onChangeField('mataKuliah', text)}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Deskripsi tugas"
        placeholderTextColor="#9CA3AF"
        value={form.deskripsi}
        onChangeText={(text) => onChangeField('deskripsi', text)}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Deadline (YYYY-MM-DD)"
        placeholderTextColor="#9CA3AF"
        value={form.deadline}
        onChangeText={(text) => onChangeField('deadline', text)}
        maxLength={10}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>+ Tambah Tugas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  title: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    marginBottom: 8,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  textArea: { minHeight: 60, textAlignVertical: 'top' },
  error: { color: '#DC2626', fontSize: 12, marginBottom: 8 },
  button: { backgroundColor: '#4F46E5', borderRadius: 8, paddingVertical: 11, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
