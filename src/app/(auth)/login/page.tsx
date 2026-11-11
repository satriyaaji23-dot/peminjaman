'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Truck, Eye, EyeOff, Shield, Users } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading
    await new Promise(r => setTimeout(r, 800));

    const success = login(username, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Username tidak ditemukan. Gunakan: admin, supervisor, driver1, atau driver2');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f2b5b] relative overflow-hidden flex-col justify-between p-12">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 border border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-96 h-96 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white rounded-full" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
              <Truck className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">SILOG</h1>
              <p className="text-blue-300 text-sm">PT Semen Indonesia Logistik</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Driver Performance<br />& Control Tower
          </h2>
          <p className="text-blue-200 text-lg max-w-md">
            Sistem monitoring dan pengendalian kinerja driver distribusi semen secara real-time.
          </p>
        </div>

        <div className="relative z-10 flex gap-8">
          <div>
            <p className="text-3xl font-bold text-blue-400">12+</p>
            <p className="text-blue-300 text-sm">Driver Aktif</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-400">87%</p>
            <p className="text-blue-300 text-sm">Rata-rata OTIF</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-400">24/7</p>
            <p className="text-blue-300 text-sm">Monitoring</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#f0f4f8]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-[#0f2b5b] flex items-center justify-center">
              <Truck className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#0f2b5b]">SILOG</h1>
              <p className="text-gray-500 text-xs">Driver Control Tower</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Masuk ke Sistem</h2>
              <p className="text-gray-500 mt-1 text-sm">Masukkan kredensial Anda untuk melanjutkan</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0f2b5b] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1a3d7a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : (
                  'Masuk'
                )}
              </button>
            </form>

            {/* Demo accounts */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center mb-3">Akun Demo (password bebas):</p>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => { setUsername('admin'); setPassword('demo'); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-xs text-gray-600 transition-colors"
                >
                  <Shield size={14} className="text-blue-500" />
                  <span className="font-medium">admin</span>
                  <span className="text-gray-400">— Admin / Control Tower</span>
                </button>
                <button
                  onClick={() => { setUsername('supervisor'); setPassword('demo'); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-xs text-gray-600 transition-colors"
                >
                  <Users size={14} className="text-green-500" />
                  <span className="font-medium">supervisor</span>
                  <span className="text-gray-400">— Supervisor</span>
                </button>
                <button
                  onClick={() => { setUsername('driver1'); setPassword('demo'); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-xs text-gray-600 transition-colors"
                >
                  <Truck size={14} className="text-orange-500" />
                  <span className="font-medium">driver1</span>
                  <span className="text-gray-400">— Driver (Rizal Firmansyah)</span>
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            © 2024 PT Semen Indonesia Logistik. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
