export const STATUS = {
  BELUM: 'Belum Dikerjakan',
  SELESAI: 'Selesai',
};

export const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  TOGGLE_STATUS: 'TOGGLE_STATUS',
  RESET_TASKS: 'RESET_TASKS',
};

export const initialTasks = [
  {
    id: '1',
    nama: 'Resume Materi Data Warehouse',
    mataKuliah: 'Data Warehouse & Data Mining',
    deskripsi: 'Membuat resume materi pengantar data warehouse dan perbedaannya dengan database biasa.',
    deadline: '2026-11-12',
    status: STATUS.BELUM,
  },
  {
    id: '2',
    nama: 'Konfigurasi Access Point',
    mataKuliah: 'Jaringan Nircable',
    deskripsi: 'Praktikum konfigurasi access point mode infrastructure dan ad-hoc.',
    deadline: '2026-11-14',
    status: STATUS.SELESAI,
  },
  {
    id: '3',
    nama: 'Analisis Ancaman Keamanan Jaringan',
    mataKuliah: 'Keamanan Informasi dan Jaringan',
    deskripsi: 'Mengidentifikasi jenis-jenis serangan siber dan cara mitigasinya.',
    deadline: '2026-11-16',
    status: STATUS.BELUM,
  },
  {
    id: '4',
    nama: 'Studi Kasus Manajemen Proyek',
    mataKuliah: 'Manajemen Sains',
    deskripsi: 'Menganalisis studi kasus manajemen proyek menggunakan metode CPM.',
    deadline: '2026-11-18',
    status: STATUS.BELUM,
  },
  {
    id: '5',
    nama: 'Implementasi Inheritance dan Polymorphism',
    mataKuliah: 'Pemodelan Berorientasi Objek',
    deskripsi: 'Membuat diagram kelas dan implementasi konsep OOP dalam program sederhana.',
    deadline: '2026-11-20',
    status: STATUS.SELESAI,
  },
  {
    id: '6',
    nama: 'Laporan Praktikum useReducer',
    mataKuliah: 'Pemrograman Visual I',
    deskripsi: 'Membuat laporan dan dokumentasi aplikasi manajemen tugas menggunakan React Native hooks.',
    deadline: '2026-11-22',
    status: STATUS.BELUM,
  },
];

export function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [action.payload, ...state];

    case ACTIONS.DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);

    case ACTIONS.TOGGLE_STATUS:
      return state.map((task) =>
        task.id === action.payload
          ? {
              ...task,
              status: task.status === STATUS.SELESAI ? STATUS.BELUM : STATUS.SELESAI,
            }
          : task
      );

    case ACTIONS.RESET_TASKS:
      return [];

    default:
      return state;
  }
}
