#!/bin/bash
# WALK QA 10 dunia k2 P3 (p3-011..020): open URL -> lewatiMuat -> MULAI -> aksi -> 4x pergi -> cek tugu
BASE="http://localhost:8123/akiomidaspace/pelajaran.html"
OUT=/home/z/my-project/hasbul-qa/p3k2
mkdir -p "$OUT"
for i in 011 012 013 014 015 016 017 018 019 020; do
  echo "===== p3-$i ====="
  agent-browser open "$BASE?id=p3-$i" > /dev/null 2>&1
  sleep 3
  agent-browser eval "PLDBG.lewatiMuat(); 'ok'" > /dev/null 2>&1
  sleep 6
  agent-browser eval "const b=document.getElementById('btnMasuk'); b?b.click():'no'; 'ok'" > /dev/null 2>&1
  sleep 2
  agent-browser eval "PLDBG.aksi(); 'ok'" > /dev/null 2>&1
  sleep 1.5
  for ((j=1; j<=4; j++)); do
    agent-browser eval "PLDBG.pergi(); 'ok'" > /dev/null 2>&1
    sleep 3.4
  done
  HASIL=$(agent-browser eval "document.body.innerText.replace(/\n+/g,' | ').slice(0,220)" 2>/dev/null)
  echo "$HASIL"
  agent-browser screenshot "$OUT/p3-$i-tugu.png" > /dev/null 2>&1
done
echo "===== SELESAI WALK ====="
