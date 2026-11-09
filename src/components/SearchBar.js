import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar({ keyword, onChangeKeyword }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="🔍 Cari nama tugas atau mata kuliah..."
        placeholderTextColor="#9CA3AF"
        value={keyword}
        onChangeText={onChangeKeyword}
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: '#111827',
  },
});
