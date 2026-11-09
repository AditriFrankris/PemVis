// ============================================================
// TaskCard.js  (KOMPONEN ANAK)
// Menerima data tugas dari komponen induk (App.js) melalui Props:
// nama, mataKuliah, deskripsi, deadline, status, onToggle, onDelete
// ============================================================
import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { STATUS } from '../reducer/taskReducer';

function TaskCard({ id, nama, mataKuliah, deskripsi, deadline, status, onToggle, onDelete }) {
  const selesai = status === STATUS.SELESAI;

  return (
    <View style={[styles.card, selesai ? styles.cardSelesai : styles.cardBelum]}>
      <View style={styles.header}>
        <Text style={styles.mataKuliah}>{mataKuliah}</Text>
        <View style={[styles.badge, selesai ? styles.badgeSelesai : styles.badgeBelum]}>
          <Text style={[styles.badgeText, selesai ? styles.badgeTextSelesai : styles.badgeTextBelum]}>
            {selesai ? '✓ ' : '• '}
            {status}
          </Text>
        </View>
      </View>

      <Text style={[styles.nama, selesai && styles.coret]}>{nama}</Text>
      {deskripsi ? <Text style={styles.deskripsi}>{deskripsi}</Text> : null}
      <Text style={styles.deadline}>📅 Deadline: {deadline}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, selesai ? styles.btnUndo : styles.btnDone]}
          onPress={() => onToggle(id)}
        >
          <Text style={styles.btnText}>{selesai ? 'Tandai Belum' : 'Tandai Selesai'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnDelete]} onPress={() => onDelete(id)}>
          <Text style={styles.btnText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// memo: TaskCard hanya render ulang jika props-nya berubah.
// Ini bekerja efektif karena onToggle & onDelete distabilkan dengan useCallback.
export default memo(TaskCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardBelum: { borderLeftColor: '#F59E0B' },
  cardSelesai: { borderLeftColor: '#10B981', backgroundColor: '#F3FBF7' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  mataKuliah: { flex: 1, fontSize: 12, fontWeight: '600', color: '#4F46E5', textTransform: 'uppercase' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  badgeBelum: { backgroundColor: '#FEF3C7' },
  badgeSelesai: { backgroundColor: '#D1FAE5' },
  badgeText: { fontSize: 11, fontWeight: '700' },
  badgeTextBelum: { color: '#92400E' },
  badgeTextSelesai: { color: '#065F46' },
  nama: { fontSize: 16, fontWeight: '700', color: '#111827', marginTop: 6 },
  coret: { textDecorationLine: 'line-through', color: '#6B7280' },
  deskripsi: { fontSize: 13, color: '#4B5563', marginTop: 4, lineHeight: 18 },
  deadline: { fontSize: 12, color: '#6B7280', marginTop: 8 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 12 },
  btn: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  btnDone: { backgroundColor: '#10B981' },
  btnUndo: { backgroundColor: '#6B7280' },
  btnDelete: { backgroundColor: '#EF4444' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
});
