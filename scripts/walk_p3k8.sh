#!/bin/bash
AB="agent-browser"
IDS="p3-071 p3-072 p3-073 p3-074 p3-075 p3-076 p3-077 p3-078 p3-079 p3-080"
refUntuk() {
  $AB snapshot -i 2>/dev/null | grep -o "$1\" \[ref=[a-z0-9]*\]" | head -1 | sed 's/.*ref=\([a-z0-9]*\)\]/\1/'
}
for id in $IDS; do
  $AB open "http://localhost:8123/pelajaran.html?id=$id" >/dev/null 2>&1
  sleep 1.6
  $AB eval "PLDBG.lewatiMuat()" >/dev/null 2>&1
  sleep 0.9
  R_MULAI=$(refUntuk "MULAI PETUALANGAN")
  [ -n "$R_MULAI" ] && $AB click ref=$R_MULAI >/dev/null 2>&1
  sleep 0.9
  R_LIHAT=$(refUntuk "LIHAT CERITA")
  [ -n "$R_LIHAT" ] && $AB click ref=$R_LIHAT >/dev/null 2>&1
  sleep 2.3
  st1=$($AB eval "document.getElementById('dlgJudul').textContent + ' :: ' + document.getElementById('dlgTeks').textContent.length" 2>/dev/null)
  R_PERGI=$(refUntuk "PERGI")
  for i in 1 2 3 4; do
    [ -n "$R_PERGI" ] && $AB click ref=$R_PERGI >/dev/null 2>&1
    sleep 3.2
  done
  tugu=$($AB eval "document.getElementById('dlgJudul').textContent" 2>/dev/null)
  teks=$($AB eval "document.getElementById('dlgTeks').textContent" 2>/dev/null)
  owalah=$(echo "$teks" | grep -c "Owalah, ternyata begini toh")
  mudah=$(echo "$teks" | grep -c "Mudah, bukan?")
  selesai=$($AB eval "localStorage.getItem('cerita-selesai-$id')" 2>/dev/null)
  echo "$id | st1: $st1 | tugu: $tugu | Owalah:$owalah Mudah:$mudah selesai:$selesai"
done
