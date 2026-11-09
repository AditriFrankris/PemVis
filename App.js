import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SearchBar from './src/components/SearchBar';
import SummaryCard from './src/components/SummaryCard';
import TaskCard from './src/components/TaskCard';
import TaskForm from './src/components/TaskForm';
import { ACTIONS, STATUS, initialTasks, taskReducer } from './src/reducer/taskReducer';

const EMPTY_FORM = { nama: '', mataKuliah: '', deskripsi: '', deadline: '' };

// Validasi format tanggal YYYY-MM-DD
function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value + 'T00:00:00');
  const [y, m, day] = value.split("-").map(Number);
  return !isNaN(d.getTime()) && d.getFullYear() === y && d.getMonth() + 1 === m && d.getDate() === day;
}

export default function App() {
  // ---------- useReducer: data daftar tugas ----------
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  // ---------- useState: input form, keyword, pesan error ----------
  const [form, setForm] = useState(EMPTY_FORM);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');

  // ---------- useRef: referensi TextInput nama tugas ----------
  const namaInputRef = useRef(null);

  // ---------- useEffect: pantau perubahan keyword ----------
  // Dependency array [keyword] -> efek hanya jalan saat keyword berubah
  useEffect(() => {
    console.log('Keyword pencarian berubah:', keyword === '' ? '(kosong)' : keyword);
  }, [keyword]);

  // ---------- useMemo: ringkasan tugas ----------
  // Dihitung ulang hanya ketika data tasks berubah
  const jumlahBelum = useMemo(
    () => tasks.filter((t) => t.status === STATUS.BELUM).length,
    [tasks]
  );
  const jumlahSelesai = useMemo(
    () => tasks.filter((t) => t.status === STATUS.SELESAI).length,
    [tasks]
  );

  // Hasil pencarian: dihitung ulang hanya saat tasks atau keyword berubah
  const filteredTasks = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter(
      (t) => t.nama.toLowerCase().includes(q) || t.mataKuliah.toLowerCase().includes(q)
    );
  }, [tasks, keyword]);

  // ---------- handler input form ----------
  const handleChangeField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  // ---------- useCallback: tambah tugas ----------
  const handleAddTask = useCallback(() => {
    const nama = form.nama.trim();
    const mataKuliah = form.mataKuliah.trim();
    const deskripsi = form.deskripsi.trim();
    const deadline = form.deadline.trim();

    if (!nama || !mataKuliah || !deadline) {
      setError('Nama tugas, mata kuliah, dan deadline wajib diisi.');
      return;
    }
    if (!isValidDate(deadline)) {
      setError('Format deadline harus YYYY-MM-DD, contoh: 2026-11-30.');
      return;
    }

    dispatch({
      type: ACTIONS.ADD_TASK,
      payload: {
        id: Date.now().toString(),
        nama,
        mataKuliah,
        deskripsi,
        deadline,
        status: STATUS.BELUM,
      },
    });

    setForm(EMPTY_FORM);
    setError('');
    // useRef: arahkan fokus kembali ke input nama tugas
    namaInputRef.current?.focus();
  }, [form]);

  // ---------- useCallback: hapus tugas ----------
  const handleDeleteTask = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
  }, []);

  // ---------- useCallback: ubah status tugas ----------
  const handleToggleStatus = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE_STATUS, payload: id });
  }, []);

  // ---------- reset semua tugas (dengan konfirmasi) ----------
  const handleResetTasks = useCallback(() => {
    const reset = () => dispatch({ type: ACTIONS.RESET_TASKS });
    if (Platform.OS === 'web') {
      if (window.confirm('Hapus seluruh data tugas?')) reset();
      return;
    }
    Alert.alert('Reset Tugas', 'Hapus seluruh data tugas?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus Semua', style: 'destructive', onPress: reset },
    ]);
  }, []);

  // ---------- render item FlatList: kirim data via Props ke TaskCard ----------
  const renderItem = useCallback(
    ({ item }) => (
      <TaskCard
        id={item.id}
        nama={item.nama}
        mataKuliah={item.mataKuliah}
        deskripsi={item.deskripsi}
        deadline={item.deadline}
        status={item.status}
        onToggle={handleToggleStatus}
        onDelete={handleDeleteTask}
      />
    ),
    [handleToggleStatus, handleDeleteTask]
  );

  // Header FlatList (dikirim sebagai elemen, bukan komponen, agar TextInput tidak kehilangan fokus)
  const listHeader = (
    <View>
      <SummaryCard total={tasks.length} belum={jumlahBelum} selesai={jumlahSelesai} />
      <TaskForm
        form={form}
        onChangeField={handleChangeField}
        onSubmit={handleAddTask}
        namaInputRef={namaInputRef}
        error={error}
      />
      <SearchBar keyword={keyword} onChangeKeyword={setKeyword} />
      <View style={styles.listTitleRow}>
        <Text style={styles.listTitle}>
          Daftar Tugas {keyword ? `(${filteredTasks.length} hasil)` : ''}
        </Text>
        {tasks.length > 0 && (
          <TouchableOpacity onPress={handleResetTasks}>
            <Text style={styles.resetText}>Reset Semua</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.appBar}>
        <Text style={styles.appTitle}>📚 Tugas Kuliahku</Text>
        <Text style={styles.appSubtitle}>Catat, kelola, dan pantau tugas perkuliahan</Text>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {keyword ? 'Tidak ada tugas yang cocok dengan pencarian.' : 'Belum ada tugas.'}
          </Text>
        }
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  appBar: {
    backgroundColor: '#4F46E5',
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 24) + 12 : 54,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  appTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  appSubtitle: { color: '#E0E7FF', fontSize: 13, marginTop: 2 },
  listContent: { padding: 16, paddingBottom: 40 },
  listTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  resetText: { color: '#DC2626', fontWeight: '600', fontSize: 13 },
  empty: { textAlign: 'center', color: '#6B7280', marginTop: 24 },
});
