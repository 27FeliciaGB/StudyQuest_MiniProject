export let daftarTugas = [
    {
        id: 1,
        nama:"Laporan Praktikum",
        mataKuliah:"Dasar Pemrograman",
        deadline:"2026-10-19",
        prioritas:"Tinggi",
        status:"Belum Selesai"
    },
        {
        id: 2,
        nama:"membuat normalisasi database",
        mataKuliah:"Basis Data",
        deadline:"2026-10-20",
        prioritas:"Sedang",
        status:"Belum Selesai"
    },
]
export const setDaftarTugas = (daftarBaru) => {
    daftarTugas = daftarBaru;
};