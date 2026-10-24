
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import {
    tambahTugas,
    tampilkanDaftarTugas,
    ubahTugas,
    hapusTugas
} from "./function.js";

import {
    formatTanggal,
    cekDeadline,
    hitungTugasSelesai,
    hitungTugasBelumSelesai,
    urutkanPrioritas
} from "./utils.js";

const rl = readline.createInterface({ input, output });

// Memeriksa format dan kebenaran tanggal
const tanggalValid = (tanggal) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) return false;

    const [tahun, bulan, hari] = tanggal.split("-").map(Number);
    const tanggalInput = new Date(tahun, bulan - 1, hari);

    return tanggalInput.getFullYear() === tahun &&
        tanggalInput.getMonth() === bulan - 1 &&
        tanggalInput.getDate() === hari;
};

// Mencari tugas berdasarkan ID
const cariTugas = (id) =>
    tampilkanDaftarTugas().find(tugas => tugas.id === id);

// Menampilkan daftar tugas
const lihatTugas = () => {
    const daftar = urutkanPrioritas(tampilkanDaftarTugas());

    if (daftar.length === 0) {
        console.log("Belum ada tugas.");
        return;
    }

    console.table(daftar.map(tugas => ({
        ID: tugas.id,
        Nama: tugas.nama,
        "Mata Kuliah": tugas.mataKuliah,
        Deadline: formatTanggal(tugas.deadline),
        Prioritas: tugas.prioritas,
        Status: tugas.status,
        Keterangan: cekDeadline(tugas.deadline, tugas.status)
    })));
};

// Memilih prioritas
const pilihPrioritas = (input) => {
    const pilihan = {
        tinggi: "Tinggi",
        sedang: "Sedang",
        rendah: "Rendah"
    };

    return pilihan[input.trim().toLowerCase()];
};

// 1. Menambah tugas
const menuTambah = async () => {
    const nama = (await rl.question("Nama tugas: ")).trim();
    const mataKuliah = (await rl.question("Mata kuliah: ")).trim();
    const deadline = (await rl.question("Deadline (YYYY-MM-DD): ")).trim();
    const prioritas = pilihPrioritas(
        await rl.question("Prioritas (Tinggi/Sedang/Rendah): ")
    );

    if (!nama || !mataKuliah) {
        console.log("Nama dan mata kuliah wajib diisi.");
    } else if (!tanggalValid(deadline)) {
        console.log("Tanggal tidak valid.");
    } else if (!prioritas) {
        console.log("Prioritas tidak valid.");
    } else {
        console.log(tambahTugas(nama, mataKuliah, deadline, prioritas).pesan);
    }
};

// 2. Mengubah status tugas
const menuUbahStatus = async () => {
    lihatTugas();

    const id = Number(await rl.question("Masukkan ID tugas: "));
    const tugas = cariTugas(id);

    if (!tugas) {
        console.log("ID tugas tidak ditemukan.");
        return;
    }

    console.log("1. Belum Selesai");
    console.log("2. Selesai");

    const pilihan = await rl.question("Pilih status: ");

    if (pilihan === "1" || pilihan === "2") {
        const status = pilihan === "1" ? "Belum Selesai" : "Selesai";
        console.log(ubahTugas(id, { status }).pesan);
    } else {
        console.log("Pilihan tidak valid.");
    }
};

// 3. Mengedit detail tugas
const menuEdit = async () => {
    lihatTugas();

    const id = Number(await rl.question("Masukkan ID tugas: "));
    const tugas = cariTugas(id);

    if (!tugas) {
        console.log("ID tugas tidak ditemukan.");
        return;
    }

    console.log("Kosongkan isian jika tidak ingin mengubahnya.");

    const nama = (await rl.question(`Nama [${tugas.nama}]: `)).trim();
    const mataKuliah = (await rl.question(`Mata kuliah [${tugas.mataKuliah}]: `)).trim();
    const deadline = (await rl.question(`Deadline [${tugas.deadline}]: `)).trim();
    const inputPrioritas = (await rl.question(`Prioritas [${tugas.prioritas}]: `)).trim();

    const perubahan = {};

    if (nama) perubahan.nama = nama;
    if (mataKuliah) perubahan.mataKuliah = mataKuliah;

    if (deadline) {
        if (!tanggalValid(deadline)) {
            console.log("Tanggal tidak valid.");
            return;
        }

        perubahan.deadline = deadline;
    }

    if (inputPrioritas) {
        const prioritas = pilihPrioritas(inputPrioritas);

        if (!prioritas) {
            console.log("Prioritas tidak valid.");
            return;
        }

        perubahan.prioritas = prioritas;
    }

    console.log(ubahTugas(id, perubahan).pesan);
};

// 4. Menghapus tugas
const menuHapus = async () => {
    lihatTugas();

    const id = Number(await rl.question("Masukkan ID tugas: "));
    const tugas = cariTugas(id);

    if (!tugas) {
        console.log("ID tugas tidak ditemukan.");
        return;
    }

    const konfirmasi = await rl.question(`Hapus ${tugas.nama}? (y/n): `);

    if (konfirmasi.trim().toLowerCase() === "y") {
        console.log(hapusTugas(id).pesan);
    } else {
        console.log("Penghapusan dibatalkan.");
    }
};

// 5. Menampilkan ringkasan tugas
const lihatRingkasan = () => {
    const daftar = tampilkanDaftarTugas();

    console.log("\n===== RINGKASAN STUDYQUEST =====");
    console.log("Total tugas         :", daftar.length);
    console.log("Tugas selesai       :", hitungTugasSelesai(daftar));
    console.log("Tugas belum selesai :", hitungTugasBelumSelesai(daftar));
};

// Menu utama
const main = async () => {
    let pilihan;

    do {
        console.log("\n===== STUDYQUEST =====");
        console.log("1. Tambah Tugas");
        console.log("2. Lihat Daftar Tugas");
        console.log("3. Ubah Status Tugas");
        console.log("4. Edit Detail Tugas");
        console.log("5. Hapus Tugas");
        console.log("6. Lihat Ringkasan");
        console.log("0. Keluar");

        pilihan = (await rl.question("Pilih menu: ")).trim();

        switch (pilihan) {
            case "1":
                await menuTambah();
                break;
            case "2":
                lihatTugas();
                break;
            case "3":
                await menuUbahStatus();
                break;
            case "4":
                await menuEdit();
                break;
            case "5":
                await menuHapus();
                break;
            case "6":
                lihatRingkasan();
                break;
            case "0":
                console.log("Terima kasih sudah menggunakan StudyQuest!");
                break;
            default:
                console.log("Pilihan tidak valid.");
        }
    } while (pilihan !== "0");

    rl.close();
};

main();
