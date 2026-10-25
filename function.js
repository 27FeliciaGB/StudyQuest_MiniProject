import { daftarTugas, setDaftarTugas } from "./data.js";
//CREATE : menambahkan tugas baru
export const tambahTugas = (nama, mataKuliah, deadline, prioritas) => {
    if (!nama.trim() || !mataKuliah.trim()) {
        return {
            sukses : false,
            pesan : "Nama dan mata kuliah tidak boleh kosong"
        };
    }

    const namaDuplikat = daftarTugas.some(
    tugas => tugas.nama.toLowerCase() === nama.trim().toLowerCase()
);

if (namaDuplikat) {
    return {
        berhasil: false,
        pesan: "Nama tugas sudah ada!"
    };
}
    const idBaru = daftarTugas.length === 0 
    ? 1
   : Math.max(...daftarTugas.map(tugas => tugas.id)) + 1;

    const tugasBaru = {
        id : idBaru,
        nama,
        mataKuliah,
        deadline,
        prioritas,
        status : "Belum Selesai"
    };

    setDaftarTugas([...daftarTugas, tugasBaru]);
    return{
        sukses:true,
        pesan:"Tugas berhasil ditambahkan",
        data:tugasBaru
    };
};

//READ:menampilkan daftar tugas
export const tampilkanDaftarTugas = () => {
    return daftarTugas;
};
//UPDATE: mengubah tugas berdasarkan ID
export const ubahTugas = (id, perubahan) => {
    const tugasAda = daftarTugas.some(tugas => tugas.id === id);
    if(!tugasAda){
        return {
            sukses:false,
            pesan:"Tugas dengan ID tersebut tidak ditemukan"
        }
    }
    const daftarBaru = daftarTugas.map(tugas => 
        tugas.id === id
        ?{...tugas, ...perubahan}
        : tugas
    );

setDaftarTugas(daftarBaru);
return {
    sukses:true,
    pesan:"Tugas berhasil diperbarui",
};
};

//DELETE : menghapus tugas berdasarkan ID
export const hapusTugas = (id) => {
const tugasAda = daftarTugas.some(
    tugas => tugas.id === id
);
    if (!tugasAda) {
        return{
            sukses : false,
            pesan : "Tugas dengan ID tersebut tidak ditemukan"
        };
    }
    setDaftarTugas(daftarTugas.filter(tugas => tugas.id !== id));
    return{
        sukses: true,
        pesan:"Tugas Berhasil Dihapus"
    };

};