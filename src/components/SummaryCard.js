import { StyleSheet, Text, View } from 'react-native';

function SummaryItem({ label, value, color }) {
  return (
    <View style={styles.item}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default function SummaryCard({ total, belum, selesai }) {
  return (
    <View style={styles.container}>
      <SummaryItem label="Total Tugas" value={total} color="#4F46E5" />
      <SummaryItem label="Belum Dikerjakan" value={belum} color="#D97706" />
      <SummaryItem label="Selesai" value={selesai} color="#059669" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  value: { fontSize: 24, fontWeight: '800' },
  label: { fontSize: 11, color: '#6B7280', marginTop: 2, textAlign: 'center' },
});
