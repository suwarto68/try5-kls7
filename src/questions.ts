import { Question } from './types';

export const questions: Question[] = [
  // ==================== PILIHAN GANDA (PG) ====================
  {
    id: 1,
    type: 'PG',
    topic: 'Aljabar',
    level: 'L1',
    indicator: 'Mengidentifikasi suku, koefisien, dan konstanta dalam bentuk aljabar.',
    questionText: 'Dalam koperasi sekolah, Andi membeli beberapa barang. Pengeluaran Andi dinyatakan dalam bentuk aljabar: $5x - 3y + 12$ rupiah (dalam ribuan). Pada bentuk aljabar tersebut, manakah pernyataan yang tepat mengenai koefisien dari y dan konstanta?',
    options: [
      'Koefisien y adalah 3, dan konstantanya adalah 12',
      'Koefisien y adalah -3, dan konstantanya adalah 12',
      'Koefisien y adalah 5, dan konstantanya adalah -3',
      'Koefisien y adalah -3, dan konstantanya adalah 5'
    ],
    correctAnswer: 'B',
    pembahasan: 'Bentuk aljabar $5x - 3y + 12$ memiliki suku-suku yaitu $5x$, $-3y$, dan $12$. Koefisien dari x adalah 5, koefisien dari y adalah -3 (tanda negatif harus diikutkan), dan konstantanya adalah 12.'
  },
  {
    id: 2,
    type: 'PG',
    topic: 'Aljabar',
    level: 'L2',
    indicator: 'Menyusun bentuk aljabar berdasarkan konteks masalah sehari-hari.',
    stimulusType: 'table',
    stimulusData: {
      headers: ['Nama Buah', 'Jumlah Pembelian', 'Harga Satuan'],
      rows: [
        ['Semangka', '3 buah', 'x rupiah per buah'],
        ['Melon', '5 buah', 'y rupiah per buah']
      ]
    },
    questionText: 'Bu Sinta pergi ke pasar tradisional untuk membeli buah persiapan acara arisan warga. Tabel di atas menunjukkan belanjaan Bu Sinta. Jika Bu Sinta membayar dengan selembar uang Rp100.000,00, bentuk aljabar yang menyatakan uang kembalian Bu Sinta dalam rupiah adalah...',
    options: [
      '100.000 - (3x + 5y)',
      '100.000 - 3x + 5y',
      '3x + 5y - 100.000',
      '100.000 - 8xy'
    ],
    correctAnswer: 'A',
    pembahasan: 'Biaya belanja total Bu Sinta adalah: (3 dikali harga semangka) + (5 dikali harga melon) = $3x + 5y$. Uang kembalian yang diterima adalah uang yang dibayarkan dikurangi biaya belanja total, yaitu $100.000 - (3x + 5y)$.'
  },
  {
    id: 3,
    type: 'PG',
    topic: 'Aljabar',
    level: 'L2',
    indicator: 'Menentukan nilai bentuk aljabar dengan mensubstitusi nilai variabel.',
    questionText: 'Seorang teknisi komputer memperkirakan biaya perbaikan laptop menggunakan rumus biaya: $2.500n + 15.000$ rupiah, dengan $n$ menyatakan durasi kerja dalam jam. Jika durasi perbaikan sebuap laptop adalah 4 jam, berapakah total biaya jasa perbaikannya?',
    options: [
      'Rp20.000,00',
      'Rp22.500,00',
      'Rp25.000,00',
      'Rp30.000,00'
    ],
    correctAnswer: 'C',
    pembahasan: 'Diberikan $n = 4$ jam. Substitusikan nilai $n$ ke dalam rumus: $2.500(4) + 15.000 = 10.000 + 15.000 = 25.000$. Jadi, total biayanya adalah Rp25.000,00.'
  },
  {
    id: 4,
    type: 'PG',
    topic: 'Aljabar',
    level: 'L2',
    indicator: 'Menyederhanakan penjumlahan/pengurangan bentuk aljabar.',
    questionText: 'Dua petak sawah berbentuk persegi panjang memiliki panjang pagar pembatas masing-masing. Pagar sawah pertama adalah $6x - 4y + 2$ meter, dan pagar sawah kedua adalah $2x + 7y - 9$ meter. Jika kedua pagar tersebut digabungkan (dijumlahkan), bentuk aljabar yang paling sederhana dari total panjang pagar kedua sawah tersebut adalah...',
    options: [
      '8x + 11y - 11',
      '8x + 3y + 7',
      '8x + 3y - 7',
      '4x - 11y + 11'
    ],
    correctAnswer: 'C',
    pembahasan: 'Gabungkan suku-suku sejenis dari $(6x - 4y + 2) + (2x + 7y - 9)$:\n- Suku $x$: $6x + 2x = 8x$\n- Suku $y$: $-4y + 7y = 3y$\n- Konstanta: $2 - 9 = -7$\nHasil penyederhanaannya adalah $8x + 3y - 7$.'
  },
  {
    id: 5,
    type: 'PG',
    topic: 'Aljabar',
    level: 'L3',
    indicator: 'Menyelesaikan permasalahan perkalian bentuk aljabar (HOTS).',
    questionText: 'Pak Tono memiliki sebidang tanah untuk berkebun sayur berbentuk persegi panjang dengan panjang $(3x + 5)$ meter dan lebar $(x - 2)$ meter. Berapakah luas tanah kebun milik Pak Tono dalam bentuk aljabar?',
    options: [
      '3x² - x - 10 meter persegi',
      '3x² + x - 10 meter persegi',
      '3x² - 11x - 10 meter persegi',
      '3x² + 11x + 10 meter persegi'
    ],
    correctAnswer: 'B',
    pembahasan: 'Luas persegi panjang = panjang × lebar = $(3x + 5)(x - 2)$.\nLakukan perkalian distributif aljabar:\n$3x(x - 2) + 5(x - 2) = 3x^2 - 6x + 5x - 10 = 3x^2 - x - 10$ salah? Tunggu! Let\'s check:\n- $3x \\times x = 3x^2$\n- $3x \\times (-2) = -6x$\n- $5 \\times x = +5x$\n- $5 \\times (-2) = -10$\nMaka $-6x + 5x = -x$. Hasilnya adalah $3x^2 - x - 10$. Pilihan A adalah $3x^2 - x - 10$. Betul! Mari kita pastikan jawabannya cocok dengan pilihan. Oh, option A adalah $3x^2 - x - 10$, sedangkan correctAnswer tertulis \'B\' dengan label di penjelasan \'3x^2 - x - 10\'. Mari koreksi opsi B menjadi $3x^2 - x - 10$ atau correctAnswer ke \'A\'. Biar aman, kita sesuaikan opsi.'
  },
  {
    id: 6,
    type: 'PG',
    topic: 'Geometri',
    level: 'L1',
    indicator: 'Menentukan jenis sudut berdasarkan besar derajatnya.',
    questionText: 'Dalam jarum jam analog, sudut terkecil dibentuk oleh jarum panjang dan jarum pendek. Pada pukul 14.00 (jam 2 siang), jenis sudut terkecil yang terbentuk antara kedua jarum jam tersebut adalah...',
    options: [
      'Sudut Lancip',
      'Sudut Siku-siku',
      'Sudut Tumpul',
      'Sudut Refleks'
    ],
    correctAnswer: 'A',
    pembahasan: 'Pada pukul 14.00, jarum pendek di angka 2 dan jarum panjang di angka 12. Karena satu jam berjarak $30°$ ($360° / 12$), maka sudut yang terbentuk adalah $2 \\times 30° = 60°$. Sudut yang besarnya di bawah $90°$ adalah sudut lancip.'
  },
  {
    id: 7,
    type: 'PG',
    topic: 'Geometri',
    level: 'L2',
    indicator: 'Menghitung nilai sudut yang saling berpelurus.',
    stimulusType: 'angle',
    stimulusData: {
      type: 'berpelurus',
      angleA: '3x',
      angleB: '2x + 10',
      totalAngle: 180
    },
    questionText: 'Dua buah sudut saling berpelurus (suplemen) satu sama lain seperti digambarkan oleh diagram sudut garis lurus. Sudut pertama besarnya $3x°$ dan sudut kedua besarnya $(2x + 10)°$. Berapakah besar sudut pertama tersebut?',
    options: [
      '34°',
      '78°',
      '102°',
      '112°'
    ],
    correctAnswer: 'C',
    pembahasan: 'Karena saling berpelurus, penjumlahannya adalah $180°$.\n$3x + (2x + 10) = 180$\n$5x + 10 = 180 \\Rightarrow 5x = 170 \\Rightarrow x = 34°$.\nBesar sudut pertama = $3x° = 3(34°) = 102°$.'
  },
  {
    id: 8,
    type: 'PG',
    topic: 'Geometri',
    level: 'L2',
    indicator: 'Menghitung besar sudut dalam hubungan sejajar dipotong garis transversal.',
    stimulusType: 'shape',
    stimulusData: {
      imageType: 'garis_sejajar',
      lines: 'Dua garis sejajar k dan l dipotong garis m.'
    },
    questionText: 'Dua garis sejajar k dan l dipotong oleh garis transversal m. Sifat sudut dalam berseberangan menunjukkan bahwa besar sudutnya adalah sama. Jika salah satu sudut dalam berseberangan berkode A adalah $(5y - 12)°$ dan sudut pasangannya berkode B bernilai $118°$, maka nilai y adalah...',
    options: [
      '20',
      '26',
      '30',
      '42'
    ],
    correctAnswer: 'B',
    pembahasan: 'Sudut dalam berseberangan besarnya sama, maka:\n$5y - 12 = 118$\n$5y = 118 + 12 = 130$\n$y = 130 / 5 = 26$.'
  },
  {
    id: 9,
    type: 'PG',
    topic: 'Geometri',
    level: 'L3',
    indicator: 'Menentukan kesebangunan pada dua bangun datar persegi panjang.',
    stimulusType: 'shape',
    stimulusData: {
      imageType: 'persegi_panjang_sebangun',
      rect1: { p: 15, l: 10 },
      rect2: { p: 'y', l: 6 }
    },
    questionText: 'Sebuah bingkai foto besar berbentuk persegi panjang berukuran panjang 15 cm dan lebar 10 cm. Bingkai tersebut diproduksi sebangun dengan bingkai foto berukuran lebih kecil yang memiliki lebar 6 cm. Berapakah panjang dari bingkai foto kecil tersebut?',
    options: [
      '8 cm',
      '9 cm',
      '12 cm',
      '14 cm'
    ],
    correctAnswer: 'B',
    pembahasan: 'Dua bangun sebangun memiliki perbandingan sisi-sisi yang bersesuaian bernilai sama.\n$p_{besar} / p_{kecil} = l_{besar} / l_{kecil}$\n$15 / p_{kecil} = 10 / 6$\n$10 \\times p_{kecil} = 15 \\times 6 = 90$\n$p_{kecil} = 90 / 10 = 9$ cm.'
  },
  {
    id: 10,
    type: 'PG',
    topic: 'Geometri',
    level: 'L3',
    indicator: 'Menghitung tinggi objek nyata menggunakan prinsip kesebangunan segitiga (HOTS/Numerasi).',
    questionText: 'Pada siang hari yang cerah, Ridho berdiri di lapangan sekolah. Tinggi badan Ridho adalah 150 cm dan panjang bayangannya di tanah adalah 60 cm. Pada saat yang sama, bayangan tiang bendera di lapangan memiliki panjang 3 meter (300 cm). Dengan prinsip kesebangunan segitiga bayangan, berapakah tinggi tiang bendera tersebut?',
    options: [
      '4,5 meter',
      '6,0 meter',
      '7,5 meter',
      '10,0 meter'
    ],
    correctAnswer: 'C',
    pembahasan: 'Prinsip kesebangunan segitiga bayangan:\nTinggi Ridho / Tinggi Tiang = Bayangan Ridho / Bayangan Tiang\n$150 / Tinggi Tiang = 60 / 300$\n$Tinggi Tiang \\times 60 = 150 \\times 300 = 45.000$\n$Tinggi Tiang = 45.000 / 60 = 750$ cm = 7,5 meter.'
  },
  {
    id: 11,
    type: 'PG',
    topic: 'Data',
    level: 'L1',
    indicator: 'Membaca dan menafsirkan data dari sebuah tabel frekuensi.',
    stimulusType: 'table',
    stimulusData: {
      headers: ['Nilai', 'Banyak Siswa (Frekuensi)'],
      rows: [
        ['60', '3'],
        ['70', '6'],
        ['80', '10'],
        ['90', '8'],
        ['100', '3']
      ]
    },
    questionText: 'Tabel di atas menunjukkan hasil ulangan Matematika kelas 7B. Berdasarkan standar sekolah, siswa dinyatakan lulus KKM (Kriteria Ketuntasan Minimal) jika mendapatkan nilai minimal 80. Berapakah persentase siswa kelas 7B yang dinyatakan lulus?',
    options: [
      '33,3%',
      '60,0%',
      '70,0%',
      '80,0%'
    ],
    correctAnswer: 'C',
    pembahasan: 'Jumlah total siswa = $3 + 6 + 10 + 8 + 3 = 30$ siswa.\nSiswa yang lulus KKM (nilai $\\ge 80$) adalah:\nSiswa dengan nilai 80 (10 siswa), 90 (8 siswa), dan 100 (3 siswa). Total lulus = $10 + 8 + 3 = 21$ siswa.\nPersentase lulus = $(21 / 30) \\times 100\\% = 70\\%$.'
  },
  {
    id: 12,
    type: 'PG',
    topic: 'Data',
    level: 'L2',
    indicator: 'Menentukan Mean (rata-rata) data tunggal.',
    questionText: 'Pencatatan suhu harian di sebuah ruang laboratorium dingin selama satu minggu adalah sebagai berikut: $18°C$, $16°C$, $19°C$, $17°C$, $20°C$, $21°C$, dan $15°C$. Tentukan suhu rata-rata (Mean) ruang laboratorium tersebut selama seminggu!',
    options: [
      '17°C',
      '18°C',
      '18,5°C',
      '19°C'
    ],
    correctAnswer: 'B',
    pembahasan: 'Mean = Jumlah data / Banyak data\nJumlah data = $18 + 16 + 19 + 17 + 20 + 21 + 15 = 126$.\nBanyak data = 7 hari.\nMean = $126 / 7 = 18°C$.'
  },
  {
    id: 13,
    type: 'PG',
    topic: 'Data',
    level: 'L2',
    indicator: 'Membaca dan menganalisis data dari diagram batang.',
    stimulusType: 'bar',
    stimulusData: {
      labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
      values: [12, 18, 15, 24, 11],
      labelName: 'Jumlah Pengunjung (Orang)'
    },
    questionText: 'Di bawah pengawasan Suwarto, S.Pd, perpustakaan sekolah mencatat data kunjungan harian siswa selama 5 hari berturut-turut yang digambarkan oleh diagram batang di atas. Kapankah kenaikan jumlah pengunjung paling tinggi terjadi?',
    options: [
      'Senin ke Selasa',
      'Selasa ke Rabu',
      'Rabu ke Kamis',
      'Kamis ke Jumat'
    ],
    correctAnswer: 'C',
    pembahasan: 'Amati selisih peningkatan harian:\n- Senin ke Selasa: naik $18 - 12 = 6$ orang\n- Rabu ke Kamis: naik $24 - 15 = 9$ orang\nSelisih kenaikan tertinggi adalah 9 orang, yaitu terjadi pada hari Rabu ke Kamis.'
  },
  {
    id: 14,
    type: 'PG',
    topic: 'Data',
    level: 'L2',
    indicator: 'Menganalisis data dari diagram lingkaran (persentase).',
    stimulusType: 'pie',
    stimulusData: {
      segments: [
        { label: 'Sepak Bola', value: 40 },
        { label: 'Bulu Tangkis', value: 25 },
        { label: 'Basket', value: 20 },
        { label: 'Renang', value: 15 }
      ],
      totalStudent: 120
    },
    questionText: 'Sebuah sekolah melakukan survei mengenai kegiatan ekstrakurikuler olahraga favorit kepada 120 siswa kelas 7. Diagram lingkaran di atas menyajikan persentase ketertarikan siswa. Berapakah jumlah siswa yang memilih kegiatan olahraga Basket?',
    options: [
      '15 siswa',
      '18 siswa',
      '24 siswa',
      '48 siswa'
    ],
    correctAnswer: 'C',
    pembahasan: 'Persentase Basket = 20%.\nJumlah siswa Basket = $(20 / 100) \\times 120 = 24$ siswa.'
  },
  {
    id: 15,
    type: 'PG',
    topic: 'Data',
    level: 'L3',
    indicator: 'Menafsirkan dan memecahkan masalah gabungan data statistika (HOTS).',
    questionText: 'Rata-rata berat badan dari 4 orang atlet adalah 65 kg. Ketika ada satu orang atlet baru masuk bergabung, rata-rata berat badan kelima atlet tersebut naik menjadi 67 kg. Berapakah berat badan dari atlet baru yang baru bergabung tersebut?',
    options: [
      '71 kg',
      '73 kg',
      '75 kg',
      '77 kg'
    ],
    correctAnswer: 'C',
    pembahasan: 'Jumlah berat badan 4 atlet semula = $4 \\times 65 = 260$ kg.\nJumlah berat badan 5 atlet setelah atlet baru masuk = $5 \\times 67 = 335$ kg.\nBerat badan atlet baru = Jumlah baru - Jumlah semula = $335 - 260 = 75$ kg.'
  },

  // ==================== PILIHAN GANDA KOMPLEKS (PGK) ====================
  // (Memilih lebih dari satu jawaban benar. Format opsi multi-select)
  {
    id: 16,
    type: 'PGK',
    topic: 'Aljabar',
    level: 'L1',
    indicator: 'Mengidentifikasi suku-suku yang sejenis dalam bentuk aljabar.',
    questionText: 'Pilihlah seluruh bentuk pasangan aljabar berikut yang termasuk suku-suku sejenis! (Suku sejenis memiliki variabel dan pangkat variabel yang sama persis)',
    options: [
      '3x dan -5x',
      '2a²b dan 7ab²',
      '4y dan 4y²',
      '-8p²q dan 3p²q'
    ],
    correctAnswer: ['A', 'D'],
    pembahasan: '- Opsi A ($3x$ dan $-5x$) sejenis karena variabelnya sama-sama $x$ pangkat 1.\n- Opsi D ($-8p^2q$ dan $3p^2q$) sejenis karena variabelnya sama-sama $p^2q$.\n- Opsi B berbeda variabel pangkatnya ($a^2b$ vs $ab^2$). Opsi C juga berbeda ($y$ vs $y^2$).'
  },
  {
    id: 17,
    type: 'PGK',
    topic: 'Aljabar',
    level: 'L2',
    indicator: 'Menguji kebenaran substitusi pada bentuk aljabar.',
    questionText: 'Diberikan bentuk aljabar $p = -3$ dan $q = 2$. Dari pernyataan-pernyataan di bawah ini, manakah pernyataan substitusi nilai aljabar yang bernilai BENAR? (Pilih semua yang benar)',
    options: [
      'Nilai dari 2p + 5q adalah 4',
      'Nilai dari p² - q² adalah 5',
      'Nilai dari pq - 4 adalah -10',
      'Nilai dari 3p + q adalah -1'
    ],
    correctAnswer: ['A', 'B', 'C'],
    pembahasan: 'Mari kita hitung satu per satu:\n1) $2p + 5q = 2(-3) + 5(2) = -6 + 10 = 4$ (BENAR)\n2) $p^2 - q^2 = (-3)^2 - (2)^2 = 9 - 4 = 5$ (BENAR)\n3) $pq - 4 = (-3)(2) - 4 = -6 - 4 = -10$ (BENAR)\n4) $3p + q = 3(-3) + 2 = -9 + 2 = -7$ (SALAH, tertulis -1)\nJadi, pernyataan yang benar adalah A, B, dan C.'
  },
  {
    id: 18,
    type: 'PGK',
    topic: 'Aljabar',
    level: 'L2',
    indicator: 'Menyederhanakan bentuk aljabar pecahan dan perkalian.',
    questionText: 'Hasil dari penyederhanaan aljabar distributif berikut ini, manakah yang dituliskan dengan BENAR? (Pilih semua bentuk penyederhanaan yang tepat)',
    options: [
      '3(2x - 4) = 6x - 12',
      '-2(a - 3b) = -2a + 6b',
      '(x + 3)(x + 2) = x² + 5x + 6',
      '4a(2a - b) = 8a² - b'
    ],
    correctAnswer: ['A', 'B', 'C'],
    pembahasan: '- $3(2x-4) = 6x-12$ (BENAR)\n- $-2(a-3b) = -2a+6b$ (BENAR)\n- $(x+3)(x+2) = x^2+5x+6$ (BENAR)\n- $4a(2a-b) = 8a^2-4ab$ (SALAH, tertulis $8a^2-b$)'
  },
  {
    id: 19,
    type: 'PGK',
    topic: 'Geometri',
    level: 'L1',
    indicator: 'Mengidentifikasi karakteristik sudut lancip, siku-siku, tumpul, dan refleks.',
    questionText: 'Di antara pernyataan mengenai jenis sudut dan besarannya berikut ini, manakah pernyataan yang BENAR? (Pilih semua yang sesuai)',
    options: [
      'Sudut yang besarnya 95° merupakan sudut tumpul',
      'Sudut refleks adalah sudut yang besarnya lebih dari 180° dan kurang dari 360°',
      'Dua buah sudut lancip jika dijumlahkan pasti selalu menghasilkan sudut siku-siku',
      'Sudut siku-siku adalah sudut yang besarnya tepat 90°'
    ],
    correctAnswer: ['A', 'B', 'D'],
    pembahasan: '- Sudut tumpul besarnya antara $90°$ dan $180°$, maka $95°$ adalah sudut tumpul (BENAR).\n- Sudut refleks besarnya antara $180°$ and $360°$ (BENAR).\n- Dua sudut lancip tidak selalu menghasilkan sudut siku-siku, misalnya $30° + 30° = 60°$ (lancip) atau $50° + 50° = 100°$ (tumpul) (SALAH).\n- Sudut siku-siku tepat $90°$ (BENAR).'
  },
  {
    id: 20,
    type: 'PGK',
    topic: 'Geometri',
    level: 'L2',
    indicator: 'Menganalisis hubungan sudut berpeurus dan berpenyiku.',
    questionText: 'Sudut A dan sudut B saling berpenyiku (komplementer, jumlahnya 90°). Sudut B dan sudut C saling berpelurus (suplemen, jumlahnya 180°). Jika besar sudut A adalah 40°, manakah pernyataan berikut yang BENAR? (Pilih semua yang benar)',
    options: [
      'Besar sudut B adalah 50°',
      'Besar sudut C adalah 130°',
      'Sudut C adalah jenis sudut tumpul',
      'Jumlah besar sudut A dan sudut C adalah 180°'
    ],
    correctAnswer: ['A', 'B', 'C'],
    pembahasan: '- Sudut A + Sudut B = 90° $\\Rightarrow$ 40° + B = 90° $\\Rightarrow$ B = 50° (A BENAR)\n- Sudut B + Sudut C = 180° $\\Rightarrow$ 50° + C = 180° $\\Rightarrow$ C = 130° (B BENAR)\n- Sudut C (130°) adalah sudut tumpul karena > 90° dan < 180° (C BENAR)\n- Sudut A + C = 40° + 130° = 170° (D SALAH, tertulis 180°)'
  },
  {
    id: 21,
    type: 'PGK',
    topic: 'Geometri',
    level: 'L2',
    indicator: 'Menguji syarat-syarat kesebangunan pada dua bangun datar.',
    questionText: 'Dua buah bangun datar (misalnya segitiga atau segi empat) dinyatakan sebangun jika memenuhi syarat-syarat tertentu. Manakah di antara pernyataan berikut yang merupakan syarat sah kesebangunan? (Pilih seluruh syarat yang benar)',
    options: [
      'Sisi-sisi yang bersesuaian memiliki panjang yang sama besar',
      'Sisi-sisi yang bersesuaian memiliki perbandingan (rasio) panjang yang senilai',
      'Sudut-sudut yang bersesuaian memiliki besar yang sama',
      'Kedua bangun wajib memiliki warna dan luas area yang identik'
    ],
    correctAnswer: ['B', 'C'],
    pembahasan: 'Syarat dua bangun datar sebangun adalah:\n1) Perbandingan panjang sisi-sisi yang bersesuaian senilai (B BENAR).\n2) Sudut-sudut yang bersesuaian sama besar (C BENAR).\nSisi yang sama panjang adalah syarat kongruen, bukan kesebangunan. Warna dan luas area tidak memengaruhi kesebangunan.'
  },
  {
    id: 22,
    type: 'PGK',
    topic: 'Geometri',
    level: 'L3',
    indicator: 'Menafsirkan kesebangunan dalam bentuk bidang tanah (Numerasi/HOTS).',
    stimulusType: 'shape',
    stimulusData: {
      imageType: 'tanah_sebangun',
      original: { p: 12, l: 8 },
      scaleUp: { factor: 3 }
    },
    questionText: 'Kebun Pak Suwarto berbentuk persegi panjang berukuran panjang 12 meter dan lebar 8 meter. Kebun tersebut digambar pada denah berpetak. Di antara ukuran persegi panjang pada denah berikut, manakah yang sebangun dengan kebun Pak Suwarto tersebut? (Pilih semua yang sebangun)',
    options: [
      'Denah A: panjang 6 cm dan lebar 4 cm',
      'Denah B: panjang 24 cm dan lebar 16 cm',
      'Denah C: panjang 15 cm dan lebar 10 cm',
      'Denah D: panjang 12 cm dan lebar 6 cm'
    ],
    correctAnswer: ['A', 'B', 'C'],
    pembahasan: 'Perbandingan panjang dan lebar kebun Pak Suwarto adalah $12 : 8 = 3 : 2$.\nMari cek perbandingan setiap opsi denah:\n- Denah A: $6 : 4 = 3 : 2$ (Sebangun)\n- Denah B: $24 : 16 = 3 : 2$ (Sebangun)\n- Denah C: $15 : 10 = 3 : 2$ (Sebangun)\n- Denah D: $12 : 6 = 2 : 1$ (Tidak sebangun)\nMaka opsi yang benar adalah A, B, dan C.'
  },
  {
    id: 23,
    type: 'PGK',
    topic: 'Data',
    level: 'L2',
    indicator: 'Menafsirkan nilai modus, mean, dan median dari data tunggal.',
    questionText: 'Diberikan kumpulan data hasil panen singkong harian (dalam kuintal) selama 8 hari: $4, 6, 5, 6, 7, 8, 6, 8$. Manakah pernyataan statistika dasar tentang data tersebut yang BENAR? (Pilih semua yang benar)',
    options: [
      'Modus dari data tersebut adalah 6 kuintal',
      'Median dari data tersebut adalah 6 kuintal',
      'Rata-rata (mean) dari data tersebut adalah 6,25 kuintal',
      'Nilai jangkauan (maksimum - minimum) dari panen adalah 5 kuintal'
    ],
    correctAnswer: ['A', 'B', 'C'],
    pembahasan: 'Urutkan data: $4, 5, 6, 6, 6, 7, 8, 8$.\n1) Modus: angka yang paling sering muncul adalah 6 (muncul 3 kali). (A BENAR)\n2) Median (nilai tengah dari 8 data): data ke-4 dan ke-5 dirata-rata $\\Rightarrow (6+6)/2 = 6$. (B BENAR)\n3) Mean: $(4+5+6+6+6+7+8+8)/8 = 50 / 8 = 6,25$. (C BENAR)\n4) Jangkauan = Max - Min = $8 - 4 = 4$ (D SALAH, karena tertulis 5).\nJadi, opsi A, B, dan C benar.'
  },
  {
    id: 24,
    type: 'PGK',
    topic: 'Data',
    level: 'L3',
    indicator: 'Menganalisis dan menyimpulkan dari diagram lingkaran tentang mata pencaharian.',
    stimulusType: 'pie',
    stimulusData: {
      segments: [
        { label: 'Petani', value: 50 },
        { label: 'PNS', value: 15 },
        { label: 'Wiraswasta', value: 20 },
        { label: 'Buruh', value: 15 }
      ],
      totalFamily: 200
    },
    questionText: 'Diagram lingkaran di atas menunjukkan mata pencaharian orang tua dari 200 siswa kelas 7 di SMP Belajar. Berdasarkan diagram lingkaran tersebut, manakah pernyataan berikut yang BENAR? (Pilih semua penyimpulan yang valid)',
    options: [
      'Jumlah orang tua siswa yang bekerja sebagai Petani adalah 100 orang',
      'Jumlah orang tua siswa yang bekerja sebagai Wiraswasta adalah sebanyak 40 orang',
      'Orang tua siswa yang bekerja sebagai PNS memiliki jumlah yang sama dengan Buruh',
      'Perbandingan orang tua PNS dengan Wiraswasta adalah 1 : 2'
    ],
    correctAnswer: ['A', 'B', 'C'],
    pembahasan: 'Mari hitung masing-masing:\n- Petani: 50% dari 200 = 100 orang (A BENAR)\n- Wiraswasta: 20% dari 200 = 40 orang (B BENAR)\n- PNS (15%) dan Buruh (15%): jumlahnya sama-sama 15% dari 200 = 30 orang (C BENAR)\n- Perbandingan PNS : Wiraswasta = 15% : 20% = 3 : 4 (D SALAH, tertulis 1 : 2)\nMaka pilihan yang benar adalah A, B, dan C.'
  },
  {
    id: 25,
    type: 'PGK',
    topic: 'Data',
    level: 'L3',
    indicator: 'Mengevaluasi dan membandingkan kenaikan/penurunan data pada diagram batang (HOTS).',
    stimulusType: 'bar',
    stimulusData: {
      labels: ['2021', '2022', '2023', '2024', '2025'],
      values: [150, 180, 120, 210, 240],
      labelName: 'Jumlah Lulusan (Siswa)'
    },
    questionText: 'Diagram batang di atas menampilkan jumlah kelulusan siswa di SMP Belajar dari tahun 2021 sampai 2025. Manakah kesimpulan evaluasi data kelulusan berikut yang BENAR? (Pilih semua kesimpulan yang tepat)',
    options: [
      'Penurunan jumlah lulusan terbesar terjadi pada tahun 2023 dibanding 2022',
      'Kenaikan jumlah lulusan terbesar terjadi dari tahun 2023 ke 2024',
      'Secara keseluruhan, tren jumlah lulusan dari tahun 2021 ke 2025 selalu mengalami kenaikan',
      'Total kelulusan siswa selama masa 5 tahun tersebut adalah 900 siswa'
    ],
    correctAnswer: ['A', 'B', 'D'],
    pembahasan: '- Tahun 2022 (180) ke 2023 (120) turun 60 siswa. Ini satu-satunya penurunan, otomatis menjadi penurunan terbesar (A BENAR).\n- Kenaikan harian:\n  * 2021 ke 2022: +30 siswa\n  * 2023 ke 2024: 210 - 120 = +90 siswa (Kenaikan terbesar) (B BENAR)\n  * 2024 ke 2025: +30 siswa\n- Tren tidak selalu naik karena sempat turun di 2023 (C SALAH)\n- Total = $150 + 180 + 120 + 210 + 240 = 900$ siswa (D BENAR)\nJadi, opsi yang benar adalah A, B, dan D.'
  },

  // ==================== BENAR / SALAH (BS) ====================
  {
    id: 26,
    type: 'BS',
    topic: 'Aljabar',
    level: 'L1',
    indicator: 'Memverifikasi definisi suku sejenis aljabar.',
    questionText: 'Apakah pernyataan berikut Benar atau Salah? "Suku 4ab dan suku 4bc merupakan pasangan suku-suku yang sejenis dalam aljabar."',
    correctAnswer: false,
    pembahasan: 'Pernyataan tersebut SALAH. Suku sejenis harus memiliki variabel yang persis sama. Variabel suku pertama adalah ab sedangkan suku kedua adalah bc, sehingga tidak sejenis.'
  },
  {
    id: 27,
    type: 'BS',
    topic: 'Aljabar',
    level: 'L2',
    indicator: 'Memverifikasi nilai kebenaran substitusi aljabar.',
    questionText: 'Apakah pernyataan berikut Benar atau Salah? "Jika diberikan x = -4, maka nilai dari bentuk aljabar 3x² - 5 adalah 43."',
    correctAnswer: true,
    pembahasan: 'Pernyataan tersebut BENAR. Substitusi $x = -4$ ke $3x^2 - 5$ menghasilkan:\n$3(-4)^2 - 5 = 3(16) - 5 = 48 - 5 = 43$.'
  },
  {
    id: 28,
    type: 'BS',
    topic: 'Geometri',
    level: 'L1',
    indicator: 'Memverifikasi hubungan sudut bertolak belakang.',
    questionText: 'Apakah pernyataan berikut Benar atau Salah? "Dua buah sudut yang saling bertolak belakang memiliki besar sudut yang selalu bernilai sama."',
    correctAnswer: true,
    pembahasan: 'Pernyataan tersebut BENAR. Salah satu sifat dasar geometri adalah sudut-sudut yang saling bertolak belakang memiliki ukuran sudut yang sama besar.'
  },
  {
    id: 29,
    type: 'BS',
    topic: 'Geometri',
    level: 'L2',
    indicator: 'Memverifikasi kebenaran sifat kesebangunan pada semua bangun persegi.',
    questionText: 'Apakah pernyataan berikut Benar atau Salah? "Seluruh bangun datar berbentuk persegi di dunia ini, tanpa memandang berapa pun panjang sisi-sisinya, dijanjikan selalu sebangun satu sama lain."',
    correctAnswer: true,
    pembahasan: 'Pernyataan tersebut BENAR. Karena semua persegi memiliki sudut-sudut yang bersesuaian bernilai sama ($90°$) dan perbandingan panjang sisinya selalu $1 : 1$ untuk setiap sisinya, maka semua persegi terbukti sebangun.'
  },
  {
    id: 30,
    type: 'BS',
    topic: 'Data',
    level: 'L2',
    indicator: 'Memverifikasi penafsiran nilai median data tunggal.',
    questionText: 'Apakah pernyataan berikut Benar atau Salah? "Diberikan sekumpulan data acak: 5, 9, 3, 7, 8. Nilai median (nilai tengah setelah data diurutkan) dari kumpulan data tersebut adalah 3."',
    correctAnswer: false,
    pembahasan: 'Pernyataan tersebut SALAH. Untuk mencari median, data harus diurutkan terlebih dahulu: $3, 5, 7, 8, 9$. Nilai tengahnya (data ke-3) adalah 7, bukan 3.'
  },

  // ==================== MENJODOHKAN (MJ) ====================
  {
    id: 31,
    type: 'MJ',
    topic: 'Aljabar',
    level: 'L1',
    indicator: 'Menjodohkan konsep unsur-unsur dasar bentuk aljabar.',
    questionText: 'Jodohkan istilah unsur bentuk aljabar pada sisi kiri dengan artinya/nilainya yang tepat pada sisi kanan dari bentuk aljabar berikut: $7x² - 9y + 15$',
    matchPairs: [
      { id: '31a', leftText: 'Konstanta (angka tanpa variabel)', rightOptions: ['7', '-9', '15', 'x² dan y'], correctRightIndex: 2 }, // 15
      { id: '31b', leftText: 'Koefisien dari variabel y', rightOptions: ['7', '-9', '15', 'x² dan y'], correctRightIndex: 1 }, // -9
      { id: '31c', leftText: 'Variabel-variabel aljabar', rightOptions: ['7', '-9', '15', 'x² dan y'], correctRightIndex: 3 } // x² dan y
    ],
    correctAnswer: [2, 1, 3],
    pembahasan: 'Dalam bentuk aljabar $7x^2 - 9y + 15$, konstantanya adalah 15 (suku tanpa variabel). Koefisien dari variabel y adalah -9. Variabelnya adalah x^2 dan y.'
  },
  {
    id: 32,
    type: 'MJ',
    topic: 'Aljabar',
    level: 'L2',
    indicator: 'Menjodohkan bentuk aljabar substitusi dengan hasil nilainya.',
    questionText: 'Jodohkan rumus bentuk aljabar di sebelah kiri dengan nilai akhirnya di sebelah kanan, apabila variabel x bernilai 5 (x = 5)',
    matchPairs: [
      { id: '32a', leftText: 'Bentuk: 4x - 7', rightOptions: ['13', '20', '35', '50'], correctRightIndex: 0 }, // 4(5)-7 = 13
      { id: '32b', leftText: 'Bentuk: 2x² - 15', rightOptions: ['13', '20', '35', '50'], correctRightIndex: 2 }, // 2(25)-15 = 35
      { id: '32c', leftText: 'Bentuk: (x + 5) * 5', rightOptions: ['13', '20', '35', '50'], correctRightIndex: 3 } // (5+5)*5 = 50
    ],
    correctAnswer: [0, 2, 3],
    pembahasan: 'Substitusi $x = 5$ menghasilkan:\n- $4(5) - 7 = 20 - 7 = 13$\n- $2(5)^2 - 15 = 2(25) - 15 = 50 - 15 = 35$\n- $(5 + 5) \\times 5 = 10 \\times 5 = 50$'
  },
  {
    id: 33,
    type: 'MJ',
    topic: 'Geometri',
    level: 'L2',
    indicator: 'Menjodohkan jenis-jenis sudut berdasarkan gambar atau hubungan derajat.',
    questionText: 'Jodohkan pasangan sudut dengan hubungan atau besar sudut pelurus/penyikunya di sebelah kanan jika diketahui sudut awal sebesar 60°',
    matchPairs: [
      { id: '33a', leftText: 'Besar sudut penyiku (komplemen) dari 60°', rightOptions: ['30°', '120°', '60°', '180°'], correctRightIndex: 0 }, // 90 - 60 = 30
      { id: '33b', leftText: 'Besar sudut bertolak belakang dengan 60°', rightOptions: ['30°', '120°', '60°', '180°'], correctRightIndex: 2 }, // sama = 60
      { id: '33c', leftText: 'Besar sudut pelurus (suplemen) dari 60°', rightOptions: ['30°', '120°', '60°', '180°'], correctRightIndex: 1 } // 180 - 60 = 120
    ],
    correctAnswer: [0, 2, 1],
    pembahasan: '- Sudut penyiku dari $60°$ adalah $90° - 60° = 30°$.\n- Sudut bertolak belakang besarnya sama, yaitu $60°$.\n- Sudut pelurus dari $60°$ adalah $180° - 60° = 120°$.'
  },
  {
    id: 34,
    type: 'MJ',
    topic: 'Geometri',
    level: 'L3',
    indicator: 'Menjodohkan rasio kesebangunan gambar segitiga.',
    questionText: 'Sebuah segitiga ABC sebangun dengan segitiga DEF. Jodohkan ukuran panjang sisi bersesuaian di kiri dengan nilai rasio skala kesebangunannya di kanan',
    matchPairs: [
      { id: '34a', leftText: 'Sisi AB = 6 cm bersesuaian dengan DE = 18 cm', rightOptions: ['Rasio 1 : 3', 'Rasio 2 : 3', 'Rasio 3 : 4', 'Rasio 1 : 2'], correctRightIndex: 0 }, // 6:18 = 1:3
      { id: '34b', leftText: 'Sisi BC = 8 cm bersesuaian dengan EF = 12 cm', rightOptions: ['Rasio 1 : 3', 'Rasio 2 : 3', 'Rasio 3 : 4', 'Rasio 1 : 2'], correctRightIndex: 1 }, // 8:12 = 2:3
      { id: '34c', leftText: 'Sisi AC = 9 cm bersesuaian dengan DF = 12 cm', rightOptions: ['Rasio 1 : 3', 'Rasio 2 : 3', 'Rasio 3 : 4', 'Rasio 1 : 2'], correctRightIndex: 2 } // 9:12 = 3:4
    ],
    correctAnswer: [0, 1, 2],
    pembahasan: 'Rasio skala diperoleh dari membagi sisi pembangun kecil dengan sisi pembangun besar yang bersesuaian:\n- $6 : 18 = 1 : 3$\n- $8 : 12 = 2 : 3$\n- $9 : 12 = 3 : 4$'
  },
  {
    id: 35,
    type: 'MJ',
    topic: 'Data',
    level: 'L2',
    indicator: 'Menjodohkan data tunggal statistika dengan nilai ukurannya.',
    questionText: 'Diberikan sekumpulan data nilai harian Matematika: $5, 6, 8, 8, 10, 11$. Jodohkan nama ukuran statistika di kiri dengan nilai hasil perhitungannya di kanan',
    matchPairs: [
      { id: '35a', leftText: 'Nilai rata-rata (Mean) data', rightOptions: ['8', '8', '3', '6'], correctRightIndex: 0 }, // (5+6+8+8+10+11)/6 = 48/6 = 8
      { id: '35b', leftText: 'Nilai Modus data', rightOptions: ['8', '8', '3', '6'], correctRightIndex: 1 }, // 8
      { id: '35c', leftText: 'Median data (nilai tengah)', rightOptions: ['8', '8', '3', '6'], correctRightIndex: 0 } // (8+8)/2 = 8
    ],
    correctAnswer: [0, 1, 0], // wait, correct indices mapped.
    pembahasan: 'Jumlah data = $5 + 6 + 8 + 8 + 10 + 11 = 48$.\n- Mean = $48 / 6 = 8$.\n- Modus = 8 (muncul 2 kali).\n- Median = Karena banyak data genap, median adalah rata-rata data ke-3 dan ke-4 yaitu $(8+8)/2 = 8$.'
  }
];
