
//menentukan format tugas

export const formatTanggal = (tanggal) => {
    if (!tanggal) {
        return "-";
    }

    const date = new Date(tanggal + "T00:00:00");

    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
};

//menentukan warna berdasarkan prioritas tugas

export const warnaPrioritas = (prioritas) => {
    switch (prioritas) {
        case "Tinggi":
            return "red";

        case "Sedang":
            return "orange";

        case "Rendah":
            return "green";

        default:
            return "gray";
    }
};

//memeriksa apakah tugas sudah melewati deadline
export const cekDeadline = (deadline, status) => {
if (status === "Selesai") {
    return "Selesai";
}
    if (!deadline) {
        return "deadline belum ditentukan";
    }
    const hariIni = new Date();
    hariIni.setHours(0,0,0,0);
    const tanggalDeadline = new Date(deadline + "T00:00:00");

    if (tanggalDeadline < hariIni) {
        return "Terlambat";
    }
    if (tanggalDeadline.getTime() === hariIni.getTime()) {
        return "Deadline Hari Ini";
    }
    return "Belum Terlambat";
};
    //menghitung jumlah tugas berdasarkan status 

export const hitungTugasSelesai = (daftarTugas) => {
    return daftarTugas.filter(
        tugas => tugas.status.toLowerCase() === "selesai"
    ).length;
};
    //menghitung jumlah tugas yang belum selesai 
    export const hitungTugasBelumSelesai = (daftarTugas) =>{
        return daftarTugas.filter(
            tugas => tugas.status === "Belum Selesai"
        ).length;
    };

    //mengurutkan tugas berdasarkan prioritas
export const urutkanPrioritas = (daftarTugas) => {
    const urutan = {
        "Tinggi": 1,
        "Sedang": 2,
        "Rendah": 3
    };

    return [...daftarTugas].sort(
        (a, b) => (urutan[a.prioritas] ?? 4) -
                  (urutan[b.prioritas] ?? 4)
    );
};