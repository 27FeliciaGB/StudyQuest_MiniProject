
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Menentukan lokasi file tugas.json
const lokasiFile = join(
    dirname(fileURLToPath(import.meta.url)),
    "tugas.json"
);

// Data awal jika belum ada file penyimpanan
const tugasAwal = [
    {
        id: 1,
        nama: "Laporan Praktikum",
        mataKuliah: "Dasar Pemrograman",
        deadline: "2026-10-27",
        prioritas: "Tinggi",
        status: "Belum Selesai"
    }
];

// Membaca data dari file JSON
const bacaData = () => {
    if (!existsSync(lokasiFile)) {
        writeFileSync(
            lokasiFile,
            JSON.stringify(tugasAwal, null, 4),
            "utf8"
        );

        return tugasAwal;
    }

    const isiFile = readFileSync(lokasiFile, "utf8");
    return JSON.parse(isiFile);
};

// Data tugas yang digunakan program
export let daftarTugas = bacaData();

// Menyimpan perubahan ke file JSON
export const setDaftarTugas = (dataBaru) => {
    writeFileSync(
        lokasiFile,
        JSON.stringify(dataBaru, null, 4),
        "utf8"
    );

    daftarTugas = dataBaru;
};
