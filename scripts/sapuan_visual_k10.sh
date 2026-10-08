#!/bin/bash
# SAPUAN VISUAL 10 dunia k10: screenshot state stasiun-1 (tanpa dialog)
BASE="http://localhost:8123/akiomidaspace/pelajaran.html"
OUT=/home/z/my-project/hasbul-qa/100
mkdir -p "$OUT"
for i in 091 092 093 094 095 096 097 098 099 100; do
  agent-browser open "$BASE?id=p2-$i" > /dev/null 2>&1
  sleep 2
  agent-browser eval "PLDBG.lewatiMuat(); 'ok'" > /dev/null 2>&1
  sleep 6
  agent-browser eval "const b=document.getElementById('btnMasuk'); b&&b.click(); 'ok'" > /dev/null 2>&1
  sleep 2.5
  agent-browser screenshot "$OUT/p2-$i-st1.png" > /dev/null 2>&1
  echo "p2-$i shot"
done
agent-browser set device "Desktop" > /dev/null 2>&1
echo "SELESAI SAPUAN"
