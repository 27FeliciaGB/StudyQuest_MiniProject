
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import Table from "cli-table3";

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
    if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) {
        return false;
    }

    const [tahun, bulan, hari] = tanggal.split("-").map(Number);
    const tanggalInput = new Date(tahun, bulan - 1, hari);

    return tanggalInput.getFullYear() === tahun &&
        tanggalInput.getMonth() === bulan - 1 &&
        tanggalInput.getDate() === hari;
};

// Mencari tugas berdasarkan ID
const cariTugas = (id) =>
    tampilkanDaftarTugas().find(tugas => tugas.id === id);

// Menampilkan daftar tugas dalam tabel berwarna
const lihatTugasDenganData = (dataTugas) => {
    const daftar = urutkanPrioritas(dataTugas);

    if (daftar.length === 0) {
        console.log("Tidak ada tugas yang cocok.");
        return;
    }

    const tabel = new Table({
        head: [
            "ID",
            "Nama",
            "Mata Kuliah",
            "Deadline",
            "Prioritas",
            "Status",
            "Keterangan"
        ],
        style: {
            head: ["cyan"],
            border: ["white"]
        },
        colWidths: [5, 22, 20, 20, 14, 18, 20],
        wordWrap: true
    });

    daftar.forEach(tugas => {
        let warnaBaris;

        if (tugas.status === "Selesai") {
            warnaBaris = 32; // Hijau
        } else if (tugas.prioritas === "Tinggi") {
            warnaBaris = 31; // Merah
        } else if (tugas.prioritas === "Sedang") {
            warnaBaris = 33; // Kuning
        } else {
            warnaBaris = 34; // Biru
        }

        const warnai = (teks) =>
            `\x1b[${warnaBaris}m${teks}\x1b[0m`;

        tabel.push([
            warnai(tugas.id),
            warnai(tugas.nama),
            warnai(tugas.mataKuliah),
            warnai(formatTanggal(tugas.deadline)),
            warnai(tugas.prioritas),
            warnai(tugas.status),
            warnai(cekDeadline(tugas.deadline, tugas.status))
        ]);
    });

    console.log(tabel.toString());
};

// Menampilkan seluruh daftar tugas
const lihatTugas = () => {
    lihatTugasDenganData(tampilkanDaftarTugas());
};

// Memilih prioritas
const pilihPrioritas = (inputPrioritas) => {
    const pilihan = {
        tinggi: "Tinggi",
        sedang: "Sedang",
        rendah: "Rendah"
    };

    return pilihan[inputPrioritas.trim().toLowerCase()];
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
        console.log(
            tambahTugas(nama, mataKuliah, deadline, prioritas).pesan
        );
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

    const pilihan = (await rl.question("Pilih status: ")).trim();

    if (pilihan === "1" || pilihan === "2") {
        const status = pilihan === "1"
            ? "Belum Selesai"
            : "Selesai";

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

    const nama = (
        await rl.question(`Nama [${tugas.nama}]: `)
    ).trim();

    const mataKuliah = (
        await rl.question(`Mata kuliah [${tugas.mataKuliah}]: `)
    ).trim();

    const deadline = (
        await rl.question(`Deadline [${tugas.deadline}]: `)
    ).trim();

    const inputPrioritas = (
        await rl.question(`Prioritas [${tugas.prioritas}]: `)
    ).trim();

    const perubahan = {};

    if (nama) {
        perubahan.nama = nama;
    }

    if (mataKuliah) {
        perubahan.mataKuliah = mataKuliah;
    }

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

    const konfirmasi = await rl.question(
        `Hapus ${tugas.nama}? (y/n): `
    );

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
    console.log(
        "Tugas belum selesai :",
        hitungTugasBelumSelesai(daftar)
    );
};

// 6. Mencari dan memfilter tugas
const menuCariFilter = async () => {
    console.log("\n===== CARI / FILTER TUGAS =====");
    console.log("1. Cari nama tugas");
    console.log("2. Cari mata kuliah");
    console.log("3. Filter prioritas");
    console.log("4. Filter status");
    console.log("5. Filter deadline");

    const pilihan = (
        await rl.question("Pilih menu: ")
    ).trim();

    const semuaTugas = tampilkanDaftarTugas();
    let hasil = [];

    switch (pilihan) {
        case "1": {
            const kataKunci = (
                await rl.question("Masukkan nama tugas: ")
            ).trim().toLowerCase();

            if (!kataKunci) {
                console.log("Kata kunci tidak boleh kosong.");
                return;
            }

            hasil = semuaTugas.filter(tugas =>
                tugas.nama.toLowerCase().includes(kataKunci)
            );
            break;
        }

        case "2": {
            const kataKunci = (
                await rl.question("Masukkan mata kuliah: ")
            ).trim().toLowerCase();

            if (!kataKunci) {
                console.log("Kata kunci tidak boleh kosong.");
                return;
            }

            hasil = semuaTugas.filter(tugas =>
                tugas.mataKuliah.toLowerCase().includes(kataKunci)
            );
            break;
        }

        case "3": {
            const prioritas = pilihPrioritas(
                await rl.question(
                    "Prioritas (Tinggi/Sedang/Rendah): "
                )
            );

            if (!prioritas) {
                console.log("Prioritas tidak valid.");
                return;
            }

            hasil = semuaTugas.filter(tugas =>
                tugas.prioritas === prioritas
            );
            break;
        }

        case "4": {
            console.log("1. Belum Selesai");
            console.log("2. Selesai");

            const status = (
                await rl.question("Pilih status: ")
            ).trim();

            if (status !== "1" && status !== "2") {
                console.log("Pilihan tidak valid.");
                return;
            }

            const statusDicari = status === "1"
                ? "Belum Selesai"
                : "Selesai";

            hasil = semuaTugas.filter(tugas =>
                tugas.status === statusDicari
            );
            break;
        }

        case "5": {
            console.log("1. Terlambat");
            console.log("2. Deadline Hari Ini");
            console.log("3. Belum Terlambat");

            const pilihanDeadline = (
                await rl.question("Pilih deadline: ")
            ).trim();

            const keterangan = {
                "1": "Terlambat",
                "2": "Deadline Hari Ini",
                "3": "Belum Terlambat"
            };

            if (!keterangan[pilihanDeadline]) {
                console.log("Pilihan tidak valid.");
                return;
            }

            hasil = semuaTugas.filter(tugas =>
                cekDeadline(tugas.deadline, tugas.status) ===
                keterangan[pilihanDeadline]
            );
            break;
        }

        default:
            console.log("Pilihan tidak valid.");
            return;
    }

    console.log(`\nDitemukan ${hasil.length} tugas.`);
    lihatTugasDenganData(hasil);
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
        console.log("7. Cari / Filter Tugas");
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

            case "7":
                await menuCariFilter();
                break;

            case "0":
                console.log(
                    "Terima kasih sudah menggunakan StudyQuest!"
                );
                break;

            default:
                console.log("Pilihan tidak valid.");
        }
    } while (pilihan !== "0");

    rl.close();
};

main();
