#!/bin/bash
# WALK QA 10 dunia k10 (p2-091..100): open URL -> lewatiMuat -> MULAI -> aksi -> 4x/5x pergi -> cek tugu
BASE="http://localhost:8123/akiomidaspace/pelajaran.html"
OUT=/home/z/my-project/hasbul-qa/100
mkdir -p "$OUT"
for i in 091 092 093 094 095 096 097 098 099 100; do
  echo "===== p2-$i ====="
  agent-browser open "$BASE?id=p2-$i" > /dev/null 2>&1
  sleep 3
  agent-browser eval "PLDBG.lewatiMuat(); 'ok'" > /dev/null 2>&1
  sleep 6
  agent-browser eval "const b=document.getElementById('btnMasuk'); b?b.click():'no'; 'ok'" > /dev/null 2>&1
  sleep 2
  agent-browser eval "PLDBG.aksi(); 'ok'" > /dev/null 2>&1
  sleep 1.5
  # jumlah pergi: p2-100 = 5, lainnya 4
  N=4; [ "$i" = "100" ] && N=5
  for ((j=1; j<=N; j++)); do
    agent-browser eval "PLDBG.pergi(); 'ok'" > /dev/null 2>&1
    sleep 3.4
  done
  HASIL=$(agent-browser eval "document.body.innerText.replace(/\n+/g,' | ').slice(0,220)" 2>/dev/null)
  echo "$HASIL"
  agent-browser screenshot "$OUT/p2-$i-tugu.png" > /dev/null 2>&1
done
echo "===== SELESAI WALK ====="
