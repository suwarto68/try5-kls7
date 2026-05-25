import React, { useState, useEffect } from 'react';
import { Award, BookOpen, GraduationCap, Link2, Play, Settings } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (nama: string, kelas: string, scriptUrl: string) => void;
  savedScriptUrl: string;
}

export default function LoginScreen({ onLogin, savedScriptUrl }: LoginScreenProps) {
  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('7A');
  const [scriptUrl, setScriptUrl] = useState(savedScriptUrl || 'https://script.google.com/macros/s/AKfycbzJnpQF911UVO51_qYwHjuM1utuLqz8u59yo25V_JHUFI3m4gscFXv8_OKK66W8H8vaWQ/exec');
  const [showConfig, setShowConfig] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    if (savedScriptUrl) {
      setScriptUrl(savedScriptUrl);
    }
  }, [savedScriptUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      setErrors('Nama lengkap tidak boleh kosong');
      return;
    }
    if (nama.trim().length < 3) {
      setErrors('Nama lengkap minimal terdiri dari 3 karakter');
      return;
    }
    setErrors(null);
    onLogin(nama.trim(), kelas, scriptUrl.trim());
  };

  const codeExample = `function doPost(e) {
  try {
    // Membuka spreadsheet berdasarkan ID yang Anda miliki
    var ss = SpreadsheetApp.openById("1AotWqB2WeRTewPvgPOiWTl36F0mdoBNqtbjcxFvj7HQ");
    var sheet = ss.getSheets()[0];
    
    // Parse data JSON yang dikirim dari aplikasi
    var data = JSON.parse(e.postData.contents);
    
    // Menyusun data sesuai urutan kolom spreadsheet:
    // tanggal dan waktu | nama | kelas | benar | salah | terjawab | ragu ragu | belum terjawab | nilai
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("id-ID"),
      data.nama,
      data.kelas,
      data.benar,
      data.salah,
      data.terjawab,
      data.ragu,
      data.belumTerjawab,
      data.nilai
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data ujian berhasil terekam ke spreadsheet!"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handler untuk CORS Preflight request
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}`;

  return (
    <div id="login-screen-root" className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-800">
      {/* Top Banner (ANBK Blue & Yellow Border Accent Style) */}
      <div id="login-top-banner" className="bg-slate-900 border-b-4 border-amber-500 text-white py-4 px-6 md:px-12 flex items-center justify-between shadow-md">
        <div id="login-logo-container" className="flex items-center gap-3">
          <div id="logo-icon-bg" className="bg-amber-500 p-2 rounded-lg">
            <GraduationCap id="logo-icon" className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h1 id="app-title-main" className="font-bold tracking-tight text-lg md:text-xl">CBT ANBK MATEMATIKA KELAS VII</h1>
            <p id="app-subtitle" className="text-slate-400 text-xs md:text-sm font-mono">KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI</p>
          </div>
        </div>
        <div id="developer-tag" className="hidden sm:flex flex-col items-end">
          <span id="dev-lbl" className="text-[10px] uppercase tracking-wider text-slate-400">Guru/Pengembang</span>
          <span id="dev-val" className="font-semibold text-amber-400">Suwarto, S.Pd</span>
        </div>
      </div>

      {/* Main Body Grid */}
      <div id="login-main-section" className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div id="login-form-layout" className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel - Instructions */}
          <div id="login-instruction-panel" className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 id="inst-title" className="text-xl font-bold text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-3">
              <BookOpen id="inst-icon" className="w-5 h-5 text-amber-500" />
              Petunjuk Pelaksanaan Ujian (CBT)
            </h2>
            
            <div id="inst-steps" className="space-y-4 text-sm md:text-base leading-relaxed text-slate-600">
              <div id="step-1" className="flex gap-3">
                <span id="num-1" className="bg-slate-100 text-slate-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-slate-900">Validasi Identitas:</strong> Masukkan nama lengkap Anda dan pilih kelas (7A atau 7B) dengan benar sebelum memulai ujian.
                </div>
              </div>
              
              <div id="step-2" className="flex gap-3">
                <span id="num-2" className="bg-slate-100 text-slate-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-slate-900">Format 35 Butir Soal:</strong> 
                  <ul id="soal-list" className="list-disc ml-4 mt-1 space-y-1 text-slate-500 text-xs">
                    <li>15 Pilihan Ganda (Satu jawaban benar)</li>
                    <li>10 Pilihan Ganda Kompleks (Lebih dari satu jawaban benar)</li>
                    <li>5 Soal Benar / Salah</li>
                    <li>5 Soal Menjodohkan (Menarik garis/pilih pasangan)</li>
                  </ul>
                </div>
              </div>
              
              <div id="step-3" className="flex gap-3">
                <span id="num-3" className="bg-slate-100 text-slate-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-slate-900">Fitur ANBK Modern:</strong> Terdapat penunjuk waktu mundur, peta nomor soal, serta opsi <strong className="text-yellow-600">"Ragu-Ragu"</strong> jika Anda belum yakin dengan jawaban tersebut.
                </div>
              </div>

              <div id="step-4" className="flex gap-3">
                <span id="num-4" className="bg-slate-100 text-slate-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</span>
                <div>
                  <strong className="text-slate-900">Sinkronisasi Spreadsheet:</strong> Data ujian Anda akan secara otomatis dikirimkan ke database nilai Google Spreadsheet guru Anda begitu Anda mengeklik tombol "Kirim Jawaban".
                </div>
              </div>
            </div>

            <div id="alert-banner" className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <div id="alert-layout" className="flex gap-2">
                <Award id="alert-icon" className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p id="alert-desc" className="text-xs text-amber-800">
                  Ujian dirancang dengan navigasi yang fleksibel. Anda dapat berpindah nomor soal secara acak menggunakan tombol nomor di bagian penunjuk soal. Pastikan mengakhiri ujian dan mengeklik kirim untuk mendapatkan sertifikat kelulusan.
                </p>
              </div>
            </div>

            {/* Google Apps Script toggle */}
            <div id="gas-toggle-section" className="pt-2 border-t border-slate-100">
              <button 
                id="btn-show-config"
                onClick={() => setShowConfig(!showConfig)}
                className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
                type="button"
              >
                <Settings id="settings-icon" className="w-3.5 h-3.5" />
                {showConfig ? 'Sembunyikan Panduan Guru (Google Apps Script)' : 'Panduan Guru: Cara Menghubungkan Google Spreadsheet'}
              </button>

              {showConfig && (
                <div id="gas-guide-panel" className="mt-4 bg-slate-900 text-slate-200 p-4 rounded-xl text-xs space-y-3 font-sans overflow-auto max-h-72">
                  <p className="font-semibold text-amber-400">⚡ Langkah Menghubungkan Google Spreadsheet:</p>
                  <ol className="list-decimal ml-4 space-y-1 text-slate-300">
                    <li>Buka Google Spreadsheet berikut:<br />
                      <a 
                        href="https://docs.google.com/spreadsheets/d/1AotWqB2WeRTewPvgPOiWTl36F0mdoBNqtbjcxFvj7HQ/edit" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-cyan-400 underline inline-flex items-center gap-0.5"
                      >
                        Spreadsheet Link <Link2 className="w-3 h-3" />
                      </a>
                    </li>
                    <li>Klik menu <strong className="text-slate-100">Ekstensi &gt; Apps Script</strong>.</li>
                    <li>Hapus semua kode bawaan, lalu salin (copy) kode di bawah ini:</li>
                  </ol>
                  
                  <div className="relative">
                    <pre className="bg-slate-950 p-2 rounded text-[10px] font-mono text-emerald-400 overflow-x-auto whitespace-pre">
                      {codeExample}
                    </pre>
                  </div>

                  <ol className="list-decimal ml-4 space-y-1 text-slate-300" start={4}>
                    <li>Klik tombol Simpan (ikon disket).</li>
                    <li>Klik tombol <strong className="text-slate-100">Terapkan &gt; Penerapan Baru</strong>.</li>
                    <li>Pilih Jenis: <strong className="text-slate-100">Aplikasi Web</strong>.</li>
                    <li>Ubah deskripsi, isi 'Siapa yang memiliki akses' menjadi <strong className="text-amber-400">"Siapa saja" (Anyone)</strong>. Hal ini penting agar siswa dapat mengirim nilai.</li>
                    <li>Klik Terapkan, lalu salin <strong className="text-cyan-400">URL Aplikasi Web</strong> yang dihasilkan.</li>
                    <li>Tempelkan (paste) URL tersebut ke kolom input di sebelah kanan ini!</li>
                  </ol>
                </div>
              )}
            </div>
          </div>

          {/* Right panel - Login form card */}
          <div id="login-form-card" className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div id="login-card-header" className="bg-amber-500 p-6 text-slate-950 text-center font-bold">
              <h3 id="card-header-title" className="text-lg">MASUK CBT MANDIRI</h3>
              <p id="card-header-subtitle" className="text-xs font-medium text-amber-950 opacity-80 mt-1">Gunakan Akun / Nama Asli Anda</p>
            </div>

            <form id="form-login" onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              {errors && (
                <div id="login-err-msg" className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border-l-4 border-red-500">
                  {errors}
                </div>
              )}

              <div id="input-nama-group" className="space-y-1">
                <label id="lbl-nama" htmlFor="nama" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Nama Lengkap Siswa
                </label>
                <input
                  id="nama"
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Rafli Pratama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-900 transition-all font-medium text-sm md:text-base placeholder:text-slate-400"
                />
              </div>

              <div id="input-kelas-group" className="space-y-1">
                <label id="lbl-kelas" htmlFor="kelas" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Pilihlah Kelas
                </label>
                <select
                  id="kelas"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-900 transition-all font-medium text-sm"
                >
                  <option id="opt-7a" value="7A">Kelas 7A</option>
                  <option id="opt-7b" value="7B">Kelas 7B</option>
                </select>
              </div>

              <div id="input-script-group" className="space-y-1 pt-2 border-t border-slate-100">
                <label id="lbl-script" htmlFor="scriptUrl" className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                  Google Script Web App URL <span className="text-[10px] text-slate-400 font-normal">(Guru saja - Opsional)</span>
                </label>
                <input
                  id="scriptUrl"
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={scriptUrl}
                  onChange={(e) => setScriptUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none text-xs text-slate-700 transition-all font-mono"
                />
                <p id="script-help" className="text-[10px] text-slate-400">
                  Ujian tetap dapat dijalankan penuh bahkan tanpa Script URL ini, data akan disimulasikan secara otomatis.
                </p>
              </div>

              <button
                id="btn-submit-login"
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 md:py-4 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 transform hover:-translate-y-0.5 shadow-md hover:shadow-indigo-200"
              >
                <Play className="w-5 h-5 fill-current" />
                Mulai Ujian Sekarang
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <footer id="login-footer" className="text-center py-6 text-slate-400 text-xs border-t border-slate-200 bg-white">
        <p id="copyright-text">© 2026 CBT ANBK Matematika SMP. Dikembangkan oleh <strong className="text-slate-600">Suwarto, S.Pd</strong>.</p>
        <p id="merdeka-tag" className="mt-1 text-slate-400 font-medium">Kurikulum Merdeka Mandiri Belajar</p>
      </footer>
    </div>
  );
}
