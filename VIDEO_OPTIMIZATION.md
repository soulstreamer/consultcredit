# Optimizare Video pentru Mobile

## Problema
Video-ul hero (hero-video.mp4) are 6.38 MB și durează să se încarce pe mobil.

## Soluție
Am actualizat codul să folosească formatul WebM (mai bună compresie) cu MP4 ca fallback.

## Conversie Video

### Opțiunea 1: Conversie Online (Recomandat pentru utilizatori non-tehnici)
1. Intră pe https://cloudconvert.com/mp4-to-webm
2. Încarcă fișierul `hero-video.mp4`
3. Selectează formatul WebM
4. Click "Start Conversion"
5. Descarcă fișierul rezultat
6. Redenumește-l în `hero-video.webm`
7. Pune-l în folderul `public/`

### Opțiunea 2: Folosind FFmpeg (Pentru utilizatori avansați)

#### Instalare FFmpeg pe Windows:
```powershell
# Folosind Chocolatey
choco install ffmpeg

# Sau manual:
# 1. Descarcă de la: https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip
# 2. Extrage în C:\ffmpeg
# 3. Adaugă C:\ffmpeg\bin în PATH
```

#### Conversie:
```powershell
cd C:\Users\souls\Desktop\consultantacredit
ffmpeg -i public\hero-video.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -deadline good -cpu-used 2 -row-mt 1 -an public\hero-video.webm
```

### Parametri explicați:
- `-c:v libvpx-vp9`: Folosește codec VP9 (cea mai bună compresie)
- `-crf 35`: Calitate (0-63, 35 e un bun echilibru)
- `-an`: Fără audio (nu avem nevoie pentru background video)
- `-deadline good`: Viteză/compresie optimă
- Rezultat așteptat: ~40-60% reducere dimensiune

## Rezultate Așteptate
- Original MP4: ~6.4 MB
- WebM convertit: ~2.5-3.5 MB
- Reducere: ~45-50%
- Calitate: Păstrată (VP9 e mai eficient decât H.264)

## Suport Browser
- ✅ Chrome/Edge: WebM (VP9)
- ✅ Firefox: WebM (VP9)
- ✅ Safari: MP4 (fallback)
- ✅ iOS: MP4 (fallback)
- ✅ Android: WebM (VP9)

## Alternative (dacă WebM nu e suficient)

### 1. Reducere rezoluție video
```powershell
ffmpeg -i public\hero-video.mp4 -vf "scale=-1:720" -c:v libvpx-vp9 -crf 35 -an public\hero-video.webm
```

### 2. Compresie mai agresivă
```powershell
ffmpeg -i public\hero-video.mp4 -c:v libvpx-vp9 -crf 40 -b:v 0 -deadline good -an public\hero-video.webm
```

### 3. Conversie în imagine (dacă video-ul nu e esențial)
Dacă video-ul e doar decorativ, poți înlocui cu o imagine statică:
```tsx
// În Hero.tsx, înlocuiește <video> cu:
<img 
  src="/birou-elegant.jpg" 
  alt="Background" 
  className="absolute inset-0 w-full h-full object-cover"
/>
```

## Testare
După conversie, testează pe:
1. Chrome Desktop
2. Safari Mobile (iPhone)
3. Chrome Mobile (Android)
4. Verifică Network tab în DevTools să vezi ce format se încarcă

## Note
- WebM cu VP9 oferă aceeași calitate vizuală ca MP4 cu H.264 la ~30-40% dimensiune mai mică
- Browserele moderne preferă WebM automat
- Safari pe iOS va folosi MP4 (fallback)
