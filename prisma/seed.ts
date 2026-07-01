import {
  PrismaClient,
  UserRole,
  DayOfWeek,
  DoctorStatus,
  RoomClass,
  RoomStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.prescriptionItem.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.diseaseHistory.deleteMany();
  await prisma.diagnosis.deleteMany();
  await prisma.laboratory.deleteMany();
  await prisma.radiology.deleteMany();
  await prisma.medicalRecord.deleteMany();
  await prisma.checkIn.deleteMany();
  await prisma.queue.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.doctorSpecialization.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.pharmacist.deleteMany();
  await prisma.cashier.deleteMany();
  await prisma.nurse.deleteMany();
  await prisma.inpatient.deleteMany();
  await prisma.room.deleteMany();
  await prisma.specialization.deleteMany();
  await prisma.department.deleteMany();
  await prisma.medicine.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 12);

  // ==================== USERS ====================
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@rssetiabudi.co.id",
      password: hashedPassword,
      name: "Admin RS Setiabudi",
      role: "ADMIN",
      phone: "081234567890",
      isVerified: true,
    },
  });

  const dokter1User = await prisma.user.create({
    data: {
      email: "dr.andika@rssetiabudi.co.id",
      password: hashedPassword,
      name: "dr. Andika Pratama, Sp.PD",
      role: "DOKTER",
      phone: "081234567891",
      isVerified: true,
    },
  });

  const dokter2User = await prisma.user.create({
    data: {
      email: "dr.sari@rssetiabudi.co.id",
      password: hashedPassword,
      name: "dr. Sari Dewi, Sp.A",
      role: "DOKTER",
      phone: "081234567892",
      isVerified: true,
    },
  });

  const dokter3User = await prisma.user.create({
    data: {
      email: "dr.bambang@rssetiabudi.co.id",
      password: hashedPassword,
      name: "dr. Bambang Susilo, Sp.B",
      role: "DOKTER",
      phone: "081234567893",
      isVerified: true,
    },
  });

  const dokter4User = await prisma.user.create({
    data: {
      email: "dr.ratna@rssetiabudi.co.id",
      password: hashedPassword,
      name: "dr. Ratna Kusuma, Sp.OG",
      role: "DOKTER",
      phone: "081234567894",
      isVerified: true,
    },
  });

  const pasien1User = await prisma.user.create({
    data: {
      email: "andi@email.com",
      password: hashedPassword,
      name: "Andi Saputra",
      role: "PASIEN",
      phone: "081234567895",
      isVerified: true,
    },
  });

  const pasien2User = await prisma.user.create({
    data: {
      email: "siti@email.com",
      password: hashedPassword,
      name: "Siti Rahmawati",
      role: "PASIEN",
      phone: "081234567896",
      isVerified: true,
    },
  });

  const apotekerUser = await prisma.user.create({
    data: {
      email: "apoteker@rssetiabudi.co.id",
      password: hashedPassword,
      name: "Apt. Hendra Gunawan, S.Farm",
      role: "APOTEKER",
      phone: "081234567897",
      isVerified: true,
    },
  });

  const kasirUser = await prisma.user.create({
    data: {
      email: "kasir@rssetiabudi.co.id",
      password: hashedPassword,
      name: "Dewi Lestari",
      role: "KASIR",
      phone: "081234567898",
      isVerified: true,
    },
  });

  const perawatUser = await prisma.user.create({
    data: {
      email: "perawat@rssetiabudi.co.id",
      password: hashedPassword,
      name: "Nurul Hidayah, S.Kep",
      role: "PERAWAT",
      phone: "081234567899",
      isVerified: true,
    },
  });

  // ==================== DOCTORS ====================
  const dokter1 = await prisma.doctor.create({
    data: {
      userId: dokter1User.id,
      sip: "SIP-2024-001",
      str: "STR-2024-001",
      name: "dr. Andika Pratama, Sp.PD",
      specialization: "Penyakit Dalam",
      pengalaman: "15 tahun praktik di berbagai rumah sakit ternama",
      pendidikan: "FK Universitas Indonesia - Spesialis Penyakit Dalam",
      status: "AKTIF",
      rating: 4.8,
    },
  });

  const dokter2 = await prisma.doctor.create({
    data: {
      userId: dokter2User.id,
      sip: "SIP-2024-002",
      str: "STR-2024-002",
      name: "dr. Sari Dewi, Sp.A",
      specialization: "Anak",
      pengalaman: "10 tahun praktik sebagai dokter spesialis anak",
      pendidikan: "FK Universitas Gadjah Mada - Spesialis Anak",
      status: "AKTIF",
      rating: 4.9,
    },
  });

  const dokter3 = await prisma.doctor.create({
    data: {
      userId: dokter3User.id,
      sip: "SIP-2024-003",
      str: "STR-2024-003",
      name: "dr. Bambang Susilo, Sp.B",
      specialization: "Bedah",
      pengalaman: "20 tahun praktik bedah umum dan bedah digestif",
      pendidikan: "FK Universitas Airlangga - Spesialis Bedah",
      status: "AKTIF",
      rating: 4.7,
    },
  });

  const dokter4 = await prisma.doctor.create({
    data: {
      userId: dokter4User.id,
      sip: "SIP-2024-004",
      str: "STR-2024-004",
      name: "dr. Ratna Kusuma, Sp.OG",
      specialization: "Kandungan",
      pengalaman: "12 tahun praktik sebagai dokter spesialis kandungan",
      pendidikan: "FK Universitas Padjajaran - Spesialis Obstetri & Ginekologi",
      status: "AKTIF",
      rating: 4.9,
    },
  });

  // ==================== SPECIALIZATIONS / POLI ====================
  const poliUmum = await prisma.specialization.create({
    data: {
      name: "Poli Umum",
      description: "Pelayanan kesehatan umum",
      icon: "Stethoscope",
    },
  });

  const poliAnak = await prisma.specialization.create({
    data: {
      name: "Poli Anak",
      description: "Pelayanan kesehatan anak",
      icon: "Baby",
    },
  });

  const poliGigi = await prisma.specialization.create({
    data: {
      name: "Poli Gigi",
      description: "Pelayanan kesehatan gigi dan mulut",
      icon: "Tooth",
    },
  });

  const poliMata = await prisma.specialization.create({
    data: {
      name: "Poli Mata",
      description: "Pelayanan kesehatan mata",
      icon: "Eye",
    },
  });

  const poliTHT = await prisma.specialization.create({
    data: {
      name: "Poli THT",
      description: "Pelayanan kesehatan telinga, hidung, tenggorokan",
      icon: "Ear",
    },
  });

  const poliBedah = await prisma.specialization.create({
    data: {
      name: "Poli Bedah",
      description: "Pelayanan bedah umum",
      icon: "Syringe",
    },
  });

  const poliSaraf = await prisma.specialization.create({
    data: {
      name: "Poli Saraf",
      description: "Pelayanan kesehatan saraf",
      icon: "Brain",
    },
  });

  const poliKandungan = await prisma.specialization.create({
    data: {
      name: "Poli Kandungan",
      description: "Pelayanan kesehatan ibu dan anak",
      icon: "Heart",
    },
  });

  const poliJantung = await prisma.specialization.create({
    data: {
      name: "Poli Jantung",
      description: "Pelayanan kesehatan jantung",
      icon: "HeartPulse",
    },
  });

  const poliKulit = await prisma.specialization.create({
    data: {
      name: "Poli Kulit",
      description: "Pelayanan kesehatan kulit dan kelamin",
      icon: "Scan",
    },
  });

  const poliDalam = await prisma.specialization.create({
    data: {
      name: "Poli Penyakit Dalam",
      description: "Pelayanan penyakit dalam",
      icon: "Activity",
    },
  });

  // ==================== DOCTOR SPECIALIZATIONS ====================
  await prisma.doctorSpecialization.create({
    data: { doctorId: dokter1.id, specializationId: poliDalam.id },
  });
  await prisma.doctorSpecialization.create({
    data: { doctorId: dokter2.id, specializationId: poliAnak.id },
  });
  await prisma.doctorSpecialization.create({
    data: { doctorId: dokter3.id, specializationId: poliBedah.id },
  });
  await prisma.doctorSpecialization.create({
    data: { doctorId: dokter4.id, specializationId: poliKandungan.id },
  });

  // ==================== DEPARTMENTS ====================
  await prisma.department.createMany({
    data: [
      {
        name: "Poli Umum",
        description: "Pelayanan kesehatan umum",
        icon: "Stethoscope",
      },
      {
        name: "Poli Anak",
        description: "Pelayanan kesehatan anak",
        icon: "Baby",
      },
      {
        name: "Poli Gigi",
        description: "Pelayanan kesehatan gigi",
        icon: "Tooth",
      },
      {
        name: "Poli Mata",
        description: "Pelayanan kesehatan mata",
        icon: "Eye",
      },
      { name: "Poli THT", description: "Pelayanan THT", icon: "Ear" },
      { name: "Poli Bedah", description: "Pelayanan bedah", icon: "Syringe" },
      { name: "Poli Saraf", description: "Pelayanan saraf", icon: "Brain" },
      {
        name: "Poli Kandungan",
        description: "Pelayanan kandungan",
        icon: "Heart",
      },
      {
        name: "Poli Jantung",
        description: "Pelayanan jantung",
        icon: "HeartPulse",
      },
      { name: "Poli Kulit", description: "Pelayanan kulit", icon: "Scan" },
      {
        name: "UGD",
        description: "Unit Gawat Darurat 24 Jam",
        icon: "Ambulance",
      },
      { name: "Rawat Inap", description: "Fasilitas rawat inap", icon: "Bed" },
    ],
  });

  // ==================== SCHEDULES ====================
  const days = [
    "SENIN",
    "SELASA",
    "RABU",
    "KAMIS",
    "JUMAT",
    "SABTU",
  ] as DayOfWeek[];

  for (const day of days) {
    await prisma.schedule.create({
      data: {
        doctorId: dokter1.id,
        day,
        startTime: "08:00",
        endTime: "14:00",
        kuota: 15,
        isActive: true,
      },
    });
    await prisma.schedule.create({
      data: {
        doctorId: dokter2.id,
        day,
        startTime: "09:00",
        endTime: "15:00",
        kuota: 12,
        isActive: true,
      },
    });
    await prisma.schedule.create({
      data: {
        doctorId: dokter3.id,
        day,
        startTime: "08:00",
        endTime: "13:00",
        kuota: 10,
        isActive: true,
      },
    });
    await prisma.schedule.create({
      data: {
        doctorId: dokter4.id,
        day,
        startTime: "10:00",
        endTime: "16:00",
        kuota: 12,
        isActive: true,
      },
    });
  }

  // ==================== PATIENTS ====================
  const pasien1 = await prisma.patient.create({
    data: {
      userId: pasien1User.id,
      noRM: "RM-202401-00001",
      nik: "3174010101900001",
      name: "Andi Saputra",
      gender: "LAKI_LAKI",
      tempatLahir: "Jakarta",
      tanggalLahir: new Date("1990-01-01"),
      alamat: "Jl. Merdeka No. 123, Jakarta Pusat",
      phone: "081234567895",
      email: "andi@email.com",
      golonganDarah: "A",
      bpjs: "0001234567890",
    },
  });

  const pasien2 = await prisma.patient.create({
    data: {
      userId: pasien2User.id,
      noRM: "RM-202401-00002",
      nik: "3174020202900002",
      name: "Siti Rahmawati",
      gender: "PEREMPUAN",
      tempatLahir: "Bandung",
      tanggalLahir: new Date("1992-02-02"),
      alamat: "Jl. Diponegoro No. 456, Bandung",
      phone: "081234567896",
      email: "siti@email.com",
      golonganDarah: "B",
    },
  });

  // ==================== PHARMACIST ====================
  await prisma.pharmacist.create({
    data: {
      userId: apotekerUser.id,
      name: "Apt. Hendra Gunawan, S.Farm",
      sip: "SIPA-2024-001",
      phone: "081234567897",
    },
  });

  // ==================== CASHIER ====================
  await prisma.cashier.create({
    data: {
      userId: kasirUser.id,
      name: "Dewi Lestari",
      phone: "081234567898",
    },
  });

  // ==================== NURSE ====================
  await prisma.nurse.create({
    data: {
      userId: perawatUser.id,
      name: "Nurul Hidayah, S.Kep",
      sip: "SIPK-2024-001",
      phone: "081234567899",
    },
  });

  // ==================== MEDICINES ====================
  const medicines = [
    {
      name: "Paracetamol 500mg",
      kategori: "Analgesik",
      satuan: "Strip",
      harga: 15000,
      stok: 500,
    },
    {
      name: "Amoxicillin 500mg",
      kategori: "Antibiotik",
      satuan: "Kapsul",
      harga: 25000,
      stok: 300,
    },
    {
      name: "Ibuprofen 400mg",
      kategori: "Antiinflamasi",
      satuan: "Strip",
      harga: 20000,
      stok: 400,
    },
    {
      name: "Omeprazole 20mg",
      kategori: "Lambung",
      satuan: "Kapsul",
      harga: 18000,
      stok: 350,
    },
    {
      name: "Cetirizine 10mg",
      kategori: "Antihistamin",
      satuan: "Strip",
      harga: 12000,
      stok: 250,
    },
    {
      name: "Metformin 500mg",
      kategori: "Diabetes",
      satuan: "Strip",
      harga: 22000,
      stok: 200,
    },
    {
      name: "Amlodipine 5mg",
      kategori: "Hipertensi",
      satuan: "Strip",
      harga: 28000,
      stok: 180,
    },
    {
      name: "Salbutamol Inhaler",
      kategori: "Pernapasan",
      satuan: "Botol",
      harga: 75000,
      stok: 100,
    },
    {
      name: "Vitamin C 1000mg",
      kategori: "Vitamin",
      satuan: "Strip",
      harga: 35000,
      stok: 600,
    },
    {
      name: "Ranitidine 150mg",
      kategori: "Lambung",
      satuan: "Strip",
      harga: 15000,
      stok: 300,
    },
    {
      name: "Dexametason 0.5mg",
      kategori: "Kortikosteroid",
      satuan: "Strip",
      harga: 10000,
      stok: 200,
    },
    {
      name: "CTM 4mg",
      kategori: "Antihistamin",
      satuan: "Strip",
      harga: 8000,
      stok: 400,
    },
  ];

  for (const med of medicines) {
    await prisma.medicine.create({ data: med });
  }

  // ==================== ROOMS ====================
  const roomData = [
    {
      nomorKamar: "VIP-01",
      kelas: "VIP" as RoomClass,
      harga: 1500000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "VIP-02",
      kelas: "VIP" as RoomClass,
      harga: 1500000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "VIP-03",
      kelas: "VIP" as RoomClass,
      harga: 1500000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K1-01",
      kelas: "KELAS_1" as RoomClass,
      harga: 750000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K1-02",
      kelas: "KELAS_1" as RoomClass,
      harga: 750000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K1-03",
      kelas: "KELAS_1" as RoomClass,
      harga: 750000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K1-04",
      kelas: "KELAS_1" as RoomClass,
      harga: 750000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K2-01",
      kelas: "KELAS_2" as RoomClass,
      harga: 500000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K2-02",
      kelas: "KELAS_2" as RoomClass,
      harga: 500000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K2-03",
      kelas: "KELAS_2" as RoomClass,
      harga: 500000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K2-04",
      kelas: "KELAS_2" as RoomClass,
      harga: 500000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K2-05",
      kelas: "KELAS_2" as RoomClass,
      harga: 500000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K3-01",
      kelas: "KELAS_3" as RoomClass,
      harga: 350000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K3-02",
      kelas: "KELAS_3" as RoomClass,
      harga: 350000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K3-03",
      kelas: "KELAS_3" as RoomClass,
      harga: 350000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K3-04",
      kelas: "KELAS_3" as RoomClass,
      harga: 350000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K3-05",
      kelas: "KELAS_3" as RoomClass,
      harga: 350000,
      status: "KOSONG" as RoomStatus,
    },
    {
      nomorKamar: "K3-06",
      kelas: "KELAS_3" as RoomClass,
      harga: 350000,
      status: "KOSONG" as RoomStatus,
    },
  ];

  for (const room of roomData) {
    await prisma.room.create({ data: room });
  }

  // ==================== GET SCHEDULES ====================
  const schedules = await prisma.schedule.findMany();

  // ==================== BOOKINGS ====================
  const today = new Date();
  const bookingDates = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
  ];

  const booking1 = await prisma.booking.create({
    data: {
      patientId: pasien1.id,
      doctorId: dokter1.id,
      scheduleId: schedules[0].id,
      departmentId: (await prisma.department.findFirst({
        where: { name: "Poli Umum" },
      }))!.id,
      specializationId: poliDalam.id,
      bookingDate: bookingDates[0],
      bookingTime: "09:00",
      queueNumber: 1,
      status: "SELESAI",
      keluhan: "Demam tinggi sejak 3 hari, batuk dan pilek",
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      patientId: pasien2.id,
      doctorId: dokter2.id,
      scheduleId: schedules[1].id,
      departmentId: (await prisma.department.findFirst({
        where: { name: "Poli Anak" },
      }))!.id,
      specializationId: poliAnak.id,
      bookingDate: bookingDates[1],
      bookingTime: "10:00",
      queueNumber: 1,
      status: "SELESAI",
      keluhan: "Anak batuk berdahak dan sesak napas",
    },
  });

  const booking3 = await prisma.booking.create({
    data: {
      patientId: pasien1.id,
      doctorId: dokter3.id,
      scheduleId: schedules[2].id,
      departmentId: (await prisma.department.findFirst({
        where: { name: "Poli Bedah" },
      }))!.id,
      specializationId: poliBedah.id,
      bookingDate: bookingDates[2],
      bookingTime: "11:00",
      queueNumber: 2,
      status: "DIKONFIRMASI",
      keluhan: "Nyeri perut kanan bawah, curiga apendisitis",
    },
  });

  const booking4 = await prisma.booking.create({
    data: {
      patientId: pasien2.id,
      doctorId: dokter4.id,
      scheduleId: schedules[3].id,
      departmentId: (await prisma.department.findFirst({
        where: { name: "Poli Kandungan" },
      }))!.id,
      specializationId: poliKandungan.id,
      bookingDate: bookingDates[3],
      bookingTime: "08:00",
      queueNumber: 1,
      status: "CHECKED_IN",
      keluhan: "Kontrol kehamilan trimester 3",
    },
  });

  const booking5 = await prisma.booking.create({
    data: {
      patientId: pasien1.id,
      doctorId: dokter1.id,
      scheduleId: schedules[4].id,
      departmentId: (await prisma.department.findFirst({
        where: { name: "Poli Umum" },
      }))!.id,
      specializationId: poliDalam.id,
      bookingDate: bookingDates[4],
      bookingTime: "09:30",
      queueNumber: 3,
      status: "MENUNGGU",
      keluhan: "Kontrol diabetes melitus tipe 2",
    },
  });

  const booking6 = await prisma.booking.create({
    data: {
      patientId: pasien2.id,
      doctorId: dokter2.id,
      scheduleId: schedules[5].id,
      departmentId: (await prisma.department.findFirst({
        where: { name: "Poli Anak" },
      }))!.id,
      specializationId: poliAnak.id,
      bookingDate: bookingDates[5],
      bookingTime: "10:30",
      queueNumber: 2,
      status: "MENUNGGU",
      keluhan: "Imunisasi anak usia 2 tahun",
    },
  });

  // ==================== QUEUES ====================
  await prisma.queue.create({
    data: {
      bookingId: booking1.id,
      queueNumber: 1,
      status: "SELESAI",
      calledAt: new Date(bookingDates[0].getTime() + 60 * 60 * 1000),
    },
  });

  await prisma.queue.create({
    data: {
      bookingId: booking2.id,
      queueNumber: 1,
      status: "SELESAI",
      calledAt: new Date(bookingDates[1].getTime() + 60 * 60 * 1000),
    },
  });

  await prisma.queue.create({
    data: {
      bookingId: booking3.id,
      queueNumber: 2,
      status: "DALAM_PEMERIKSAAN",
      calledAt: new Date(bookingDates[2].getTime() + 60 * 60 * 1000),
    },
  });

  await prisma.queue.create({
    data: {
      bookingId: booking4.id,
      queueNumber: 1,
      status: "DIPANGGIL",
      calledAt: new Date(bookingDates[3].getTime() + 30 * 60 * 1000),
    },
  });

  await prisma.queue.create({
    data: {
      bookingId: booking5.id,
      queueNumber: 3,
      status: "MENUNGGU",
    },
  });

  await prisma.queue.create({
    data: {
      bookingId: booking6.id,
      queueNumber: 2,
      status: "MENUNGGU",
    },
  });

  // ==================== MEDICAL RECORDS ====================
  const mr1 = await prisma.medicalRecord.create({
    data: {
      patientId: pasien1.id,
      doctorId: dokter1.id,
      bookingId: booking1.id,
      keluhan: "Demam tinggi sejak 3 hari, batuk dan pilek",
      tekananDarah: "120/80",
      beratBadan: 65,
      tinggiBadan: 170,
      suhuTubuh: 38.5,
      catatan:
        "Pasien didiagnosis ISPA. Diberikan antibiotik dan antipiretik. Kontrol kembali jika demam tidak turun dalam 3 hari.",
      tindakan: "Pemberian obat oral dan edukasi istirahat cukup",
    },
  });

  const mr2 = await prisma.medicalRecord.create({
    data: {
      patientId: pasien2.id,
      doctorId: dokter2.id,
      bookingId: booking2.id,
      keluhan: "Anak batuk berdahak dan sesak napas",
      tekananDarah: "110/70",
      beratBadan: 15,
      tinggiBadan: 95,
      suhuTubuh: 37.8,
      catatan:
        "Pasien anak didiagnosis bronkitis akut. Diberikan antibiotik, bronkodilator, dan ekspektoran.",
      tindakan: "Nebulisasi dan pemberian obat oral",
    },
  });

  // ==================== DIAGNOSES ====================
  await prisma.diagnosis.create({
    data: {
      medicalRecordId: mr1.id,
      penyakit: "Infeksi Saluran Pernapasan Akut (ISPA)",
      icdCode: "J06.9",
      catatan: "ISPA ringan dengan demam",
    },
  });

  await prisma.diagnosis.create({
    data: {
      medicalRecordId: mr1.id,
      penyakit: "Demam",
      icdCode: "R50.9",
      catatan: "Demam akibat infeksi",
    },
  });

  await prisma.diagnosis.create({
    data: {
      medicalRecordId: mr2.id,
      penyakit: "Bronkitis Akut",
      icdCode: "J20.9",
      catatan: "Bronkitis dengan obstruksi ringan",
    },
  });

  // ==================== DISEASE HISTORIES ====================
  await prisma.diseaseHistory.create({
    data: {
      patientId: pasien1.id,
      diagnosisId: (await prisma.diagnosis.findFirst({
        where: {
          medicalRecordId: mr1.id,
          penyakit: "Infeksi Saluran Pernapasan Akut (ISPA)",
        },
      }))!.id,
      penyakit: "Infeksi Saluran Pernapasan Akut (ISPA)",
      icdCode: "J06.9",
      tanggal: bookingDates[0],
    },
  });

  await prisma.diseaseHistory.create({
    data: {
      patientId: pasien2.id,
      diagnosisId: (await prisma.diagnosis.findFirst({
        where: { medicalRecordId: mr2.id },
      }))!.id,
      penyakit: "Bronkitis Akut",
      icdCode: "J20.9",
      tanggal: bookingDates[1],
    },
  });

  // ==================== PRESCRIPTIONS ====================
  const allMedicines = await prisma.medicine.findMany();
  const paracetamol = allMedicines.find((m) => m.name === "Paracetamol 500mg")!;
  const amoxicillin = allMedicines.find((m) => m.name === "Amoxicillin 500mg")!;
  const cetirizine = allMedicines.find((m) => m.name === "Cetirizine 10mg")!;
  const vitaminC = allMedicines.find((m) => m.name === "Vitamin C 1000mg")!;
  const salbutamol = allMedicines.find((m) => m.name === "Salbutamol Inhaler")!;
  const ibuprofen = allMedicines.find((m) => m.name === "Ibuprofen 400mg")!;

  const resep1 = await prisma.prescription.create({
    data: {
      medicalRecordId: mr1.id,
      doctorId: dokter1.id,
      nomorResep: "RSP-202401-00001",
      status: "SUDAH_DIAMBIL",
      catatan: "Obat diminum setelah makan",
    },
  });

  await prisma.prescriptionItem.create({
    data: {
      prescriptionId: resep1.id,
      medicineId: paracetamol.id,
      jumlah: 10,
      aturanMinum: "3x sehari 1 tablet",
      catatan: "Jika demam",
    },
  });

  await prisma.prescriptionItem.create({
    data: {
      prescriptionId: resep1.id,
      medicineId: amoxicillin.id,
      jumlah: 21,
      aturanMinum: "3x sehari 1 kapsul",
      catatan: "Habiskan dalam 7 hari",
    },
  });

  await prisma.prescriptionItem.create({
    data: {
      prescriptionId: resep1.id,
      medicineId: vitaminC.id,
      jumlah: 10,
      aturanMinum: "1x sehari 1 tablet",
    },
  });

  const resep2 = await prisma.prescription.create({
    data: {
      medicalRecordId: mr2.id,
      doctorId: dokter2.id,
      nomorResep: "RSP-202401-00002",
      status: "SIAP_DIAMBIL",
      catatan: "Obat untuk anak, sesuaikan dosis",
    },
  });

  await prisma.prescriptionItem.create({
    data: {
      prescriptionId: resep2.id,
      medicineId: amoxicillin.id,
      jumlah: 14,
      aturanMinum: "2x sehari 1/2 kapsul",
      catatan: "Sesuai berat badan anak",
    },
  });

  await prisma.prescriptionItem.create({
    data: {
      prescriptionId: resep2.id,
      medicineId: salbutamol.id,
      jumlah: 1,
      aturanMinum: "Sesuai kebutuhan 2x semprot",
      catatan: "Jika sesak",
    },
  });

  await prisma.prescriptionItem.create({
    data: {
      prescriptionId: resep2.id,
      medicineId: cetirizine.id,
      jumlah: 5,
      aturanMinum: "1x sehari 1/2 tablet",
    },
  });

  // ==================== PAYMENTS ====================
  const payment1 = await prisma.payment.create({
    data: {
      bookingId: booking1.id,
      biayaKonsultasi: 150000,
      biayaObat: 15000 * 10 + 25000 * 21 + 35000 * 10,
      total: 150000 + 15000 * 10 + 25000 * 21 + 35000 * 10,
      metode: "CASH",
      status: "PAID",
      paidAt: new Date(bookingDates[0].getTime() + 2 * 60 * 60 * 1000),
    },
  });

  const payment2 = await prisma.payment.create({
    data: {
      bookingId: booking2.id,
      biayaKonsultasi: 150000,
      biayaObat: 25000 * 14 + 75000 * 1 + 12000 * 5,
      total: 150000 + 25000 * 14 + 75000 * 1 + 12000 * 5,
      metode: "QRIS",
      status: "PAID",
      paidAt: new Date(bookingDates[1].getTime() + 2 * 60 * 60 * 1000),
    },
  });

  const payment3 = await prisma.payment.create({
    data: {
      bookingId: booking3.id,
      biayaKonsultasi: 200000,
      total: 200000,
      metode: "DEBIT",
      status: "PENDING",
    },
  });

  const payment4 = await prisma.payment.create({
    data: {
      bookingId: booking4.id,
      biayaKonsultasi: 200000,
      total: 200000,
      status: "PENDING",
    },
  });

  // ==================== INVOICES ====================
  await prisma.invoice.create({
    data: {
      paymentId: payment1.id,
      nomorInvoice: "INV-202401-00001",
    },
  });

  await prisma.invoice.create({
    data: {
      paymentId: payment2.id,
      nomorInvoice: "INV-202401-00002",
    },
  });

  await prisma.invoice.create({
    data: {
      paymentId: payment3.id,
      nomorInvoice: "INV-202401-00003",
    },
  });

  // ==================== CHECK INS ====================
  await prisma.checkIn.create({
    data: {
      bookingId: booking1.id,
      checkedInAt: new Date(bookingDates[0].getTime() + 30 * 60 * 1000),
    },
  });

  await prisma.checkIn.create({
    data: {
      bookingId: booking2.id,
      checkedInAt: new Date(bookingDates[1].getTime() + 30 * 60 * 1000),
    },
  });

  await prisma.checkIn.create({
    data: {
      bookingId: booking3.id,
      checkedInAt: new Date(bookingDates[2].getTime() + 30 * 60 * 1000),
    },
  });

  await prisma.checkIn.create({
    data: {
      bookingId: booking4.id,
      checkedInAt: new Date(bookingDates[3].getTime() + 30 * 60 * 1000),
    },
  });

  // ==================== NOTIFICATIONS ====================
  await prisma.notification.createMany({
    data: [
      {
        userId: pasien1User.id,
        title: "Booking Dikonfirmasi",
        message:
          "Booking Anda dengan dr. Andika Pratama pada tanggal " +
          bookingDates[4].toLocaleDateString("id-ID") +
          " telah dikonfirmasi.",
        type: "booking",
        link: "/dashboard/booking",
      },
      {
        userId: pasien2User.id,
        title: "Resep Siap Diambil",
        message: "Resep obat untuk ananda telah siap diambil di apotek.",
        type: "prescription",
        link: "/dashboard/resep",
      },
      {
        userId: pasien1User.id,
        title: "Pengingat Kontrol",
        message: "Jadwal kontrol diabetes Anda dalam 2 hari lagi.",
        type: "reminder",
        link: "/dashboard/booking",
      },
    ],
  });

  console.log("✅ Seed completed successfully!");
  console.log("📧 Admin: admin@rssetiabudi.co.id / password123");
  console.log("📧 Dokter: dr.andika@rssetiabudi.co.id / password123");
  console.log("📧 Pasien: andi@email.com / password123");
  console.log("📧 Pasien 2: siti@email.com / password123");
  console.log("📧 Apoteker: apoteker@rssetiabudi.co.id / password123");
  console.log("📧 Kasir: kasir@rssetiabudi.co.id / password123");
  console.log("📧 Perawat: perawat@rssetiabudi.co.id / password123");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
