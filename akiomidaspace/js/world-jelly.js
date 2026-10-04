/* =========================================================
   DUNIA AKIOMIDA — Jelly (world-jelly.js)
   Bola squishy badan-lunak: pegas keliling, squash & stretch,
   menggelinding, melompat. Tanpa wajah, tanpa titik mata.
   ========================================================= */
window.AK = window.AK || {};

AK.PALETTE = [
  { base: '#ff9d9d', light: '#ffd4d0', dark: '#e06b76', rim: 'rgba(255,255,255,.75)' },
  { base: '#4fd1c5', light: '#b2f0e8', dark: '#2a9d94', rim: 'rgba(255,255,255,.75)' },
  { base: '#63b3ed', light: '#c3e2fb', dark: '#3d84c4', rim: 'rgba(255,255,255,.75)' },
  { base: '#f6c453', light: '#ffe9ad', dark: '#d98f2b', rim: 'rgba(255,255,255,.8)' },
  { base: '#9ae6b4', light: '#d7f7e3', dark: '#5cae7d', rim: 'rgba(255,255,255,.75)' },
  { base: '#b794f4', light: '#e2d0fc', dark: '#8658c8', rim: 'rgba(255,255,255,.75)' },
  { base: '#f687b3', light: '#fcc9dd', dark: '#c85a88', rim: 'rgba(255,255,255,.75)' },
  { base: '#f6ad55', light: '#fcdca8', dark: '#c97f2e', rim: 'rgba(255,255,255,.78)' },
];

AK.Jelly = (function () {
  const TAU = AK.TAU, rand = AK.rand, clamp = AK.clamp;
  const GRAV = 1340;   // gravitasi ringan — lompatan terasa mengapung lembut
  const K_SPRING = 170;   // pegas ke posisi istirahat
  const K_SMOOTH  = 300;  // penghalang antar titik tepi
  const G_POINT   = 360;  // tekan titik ke tanah saat di darat (efek pipih)

  class Jelly {
    constructor(o) {
      this.cx = o.x; this.cy = o.y;
      this.r = o.r || 24;
      this.vx = 0; this.vy = 0;
      this.rot = 0;
      this.grounded = true;
      this.isPlayer = !!o.player;
      this.col = o.col || AK.PALETTE[0];
      this.targetX = null;
      this.steerLock = false;
      this.wanderIn = rand(2, 7);
      this.hopIn = rand(3, 10);
      this.N = 16;
      this.pts = [];
      this.homeX = this.cx;   // NPC berkeliaran hanya di sekitar rumahnya
      for (let i = 0; i < this.N; i++) {
        const a = i / this.N * TAU;
        this.pts.push({
          a,
          x: this.cx + Math.cos(a) * this.r,
          y: this.cy + Math.sin(a) * this.r,
          vx: 0, vy: 0
        });
      }
    }

    /* kejutan saat mendarat — seluruh titik tertekan, efek squish muncul sendiri */
    impact(v) {
      const f = clamp(v / 950, 0.18, 0.95);
      for (const p of this.pts) {
        p.vy += v * 0.30 * f;
        p.vx += rand(-1, 1) * v * 0.08;
      }
      this.landPuff = Math.min(1, f);
      this.lastImpact = f;   // dipakai world-main untuk menaburkan debu
    }

    jump(pow) {
      if (!this.grounded) return;
      this.vy = -(pow || rand(340, 540));
      this.grounded = false;
      for (const p of this.pts) p.vy -= 130;   // regang sebelum melompat
    }

    /* sapaan riang saat disentuh — melompat kecil sekali */
    poke() {
      if (this.grounded) { this.vy = -300; this.grounded = false; }
      for (const p of this.pts) { p.vy -= 150; p.vx += rand(-70, 70); }
    }

    update(dt) {
      /* saat tersedot gerbang / pop kembali: pusat dikendalikan luar,
         titik tepi tetap ikut lunak mengikuti skala badan */
      if (this.masukScale != null) {
        this.softPoints(dt, this.r * Math.max(0.1, this.masukScale));
        if (this.landPuff > 0) this.landPuff = Math.max(0, this.landPuff - dt * 2.4);
        return;
      }
      const r = this.r;

      /* --- kemudi pusat --- */
      if (this.isPlayer) {
        if (this.targetX != null) {
          const d = this.targetX - this.cx;
          const want = clamp(d * 3.2, -300, 300);
          this.vx += (want - this.vx) * Math.min(1, dt * 6.5);
          if (Math.abs(d) < 10 && Math.abs(this.vx) < 26) this.targetX = null;
        } else if (this.grounded && !this.steerLock) {
          // gesekan gulung lembut: melambat mulus, tanpa tersentak
          this.vx *= Math.pow(0.14, dt);
          if (Math.abs(this.vx) < 4) this.vx = 0;
        }
      } else if (!AK.reducedMotion) {
        this.wanderIn -= dt;
        if (this.wanderIn <= 0 && this.targetX == null) {
          // berkeliaran kecil di sekitar rumah — tidak sampai menabrak gerbang,
          // dan tidak mendekati posisi pemain (pemain tak boleh terusik)
          let tX = clamp(this.cx + rand(-150, 150), this.homeX - 140, this.homeX + 140);
          if (AK.avoidX != null) {
            if (tX > AK.avoidX - 95 && tX < AK.avoidX + 95) {
              tX = (tX >= AK.avoidX) ? AK.avoidX + 95 : AK.avoidX - 95;
              tX = clamp(tX, this.homeX - 140, this.homeX + 140);
            }
          }
          this.targetX = tX;
          this.wanderIn = rand(3.5, 9);
        }
        if (this.targetX != null) {
          const d = this.targetX - this.cx;
          const want = clamp(d * 2.2, -120, 120);
          this.vx += (want - this.vx) * Math.min(1, dt * 4);
          if (Math.abs(d) < 8) this.targetX = null;
        }
        this.hopIn -= dt;
        if (this.hopIn <= 0 && this.grounded) {
          this.jump();
          this.hopIn = rand(4, 12);
        }
      }

      if (!this.grounded) this.vy += GRAV * dt;

      /* --- gerak pusat & tabrakan tanah --- */
      this.cx += this.vx * dt;
      this.cy += this.vy * dt;
      this.cx = clamp(this.cx, 30, AK.WORLD_W - 30);

      const gy = AK.groundYAt(this.cx) - r * 0.92;
      if (this.cy > gy) {
        if (!this.grounded && this.vy > 170) this.impact(this.vy);
        this.cy = gy;
        if (this.vy > 0) this.vy = 0;
        this.grounded = true;
      } else if (this.cy < gy - 2) {
        this.grounded = false;
      }

      /* --- guling: rotasi = v / r --- */
      this.rot += (this.vx / r) * dt;

      /* --- fisika titik tepi (badan lunak) --- */
      const damp = Math.pow(0.90, dt * 60);
      const sp = Math.hypot(this.vx, this.vy);
      const st = clamp(sp / 1700, 0, 0.22);       // regangan kecepatan
      let vax = 0, vay = -1;
      if (sp > 40) { vax = this.vx / sp; vay = this.vy / sp; }

      for (let i = 0; i < this.N; i++) {
        const p = this.pts[i];
        const a = p.a + this.rot;
        let tx = this.cx + Math.cos(a) * r;
        let ty = this.cy + Math.sin(a) * r;

        if (st > 0.01) {
          const rx = tx - this.cx, ry = ty - this.cy;
          const du = rx * vax + ry * vay;
          const dv = -rx * vay + ry * vax;
          const u = du * (1 + st), v = dv * (1 - st * 0.6);
          tx = this.cx + u * vax - v * vay;
          ty = this.cy + u * vay + v * vax;
        }

        p.vx += (tx - p.x) * K_SPRING * dt;
        p.vy += (ty - p.y) * K_SPRING * dt;

        const pr = this.pts[(i - 1 + this.N) % this.N];
        const nx = this.pts[(i + 1) % this.N];
        p.vx += ((pr.x + nx.x) / 2 - p.x) * K_SMOOTH * dt;
        p.vy += ((pr.y + nx.y) / 2 - p.y) * K_SMOOTH * dt;

        if (this.grounded) p.vy += G_POINT * dt;

        p.vx *= damp; p.vy *= damp;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // pengaman bentuk: tetap kenyal tapi tak pernah meleleh
        const dxp = p.x - this.cx, dyp = p.y - this.cy;
        const dp = Math.hypot(dxp, dyp) || 1;
        const dc = clamp(dp, r * 0.66, r * 1.45);
        p.x = this.cx + dxp / dp * dc;
        p.y = this.cy + dyp / dp * dc;

        const pgy = AK.groundYAt(p.x) - 1;
        if (p.y > pgy) { p.y = pgy; p.vy *= -0.18; }
      }

      if (this.landPuff > 0) this.landPuff = Math.max(0, this.landPuff - dt * 2.4);
    }

    /* fisika titik tepi — dipisah agar bisa dipakai saat badan dibekukan */
    softPoints(dt, r) {
      const damp = Math.pow(0.90, dt * 60);
      const sp = Math.hypot(this.vx, this.vy);
      const st = clamp(sp / 1700, 0, 0.22);       // regangan kecepatan
      let vax = 0, vay = -1;
      if (sp > 40) { vax = this.vx / sp; vay = this.vy / sp; }

      for (let i = 0; i < this.N; i++) {
        const p = this.pts[i];
        const a = p.a + this.rot;
        let tx = this.cx + Math.cos(a) * r;
        let ty = this.cy + Math.sin(a) * r;

        if (st > 0.01) {
          const rx = tx - this.cx, ry = ty - this.cy;
          const du = rx * vax + ry * vay;
          const dv = -rx * vay + ry * vax;
          const u = du * (1 + st), v = dv * (1 - st * 0.6);
          tx = this.cx + u * vax - v * vay;
          ty = this.cy + u * vay + v * vax;
        }

        p.vx += (tx - p.x) * K_SPRING * dt;
        p.vy += (ty - p.y) * K_SPRING * dt;

        const pr = this.pts[(i - 1 + this.N) % this.N];
        const nx = this.pts[(i + 1) % this.N];
        p.vx += ((pr.x + nx.x) / 2 - p.x) * K_SMOOTH * dt;
        p.vy += ((pr.y + nx.y) / 2 - p.y) * K_SMOOTH * dt;

        if (this.grounded) p.vy += G_POINT * dt;

        p.vx *= damp; p.vy *= damp;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // pengaman bentuk: tetap kenyal tapi tak pernah meleleh
        const dxp = p.x - this.cx, dyp = p.y - this.cy;
        const dp = Math.hypot(dxp, dyp) || 1;
        const dc = clamp(dp, r * 0.66, r * 1.45);
        p.x = this.cx + dxp / dp * dc;
        p.y = this.cy + dyp / dp * dc;

        const pgy = AK.groundYAt(p.x) - 1;
        if (p.y > pgy) { p.y = pgy; p.vy *= -0.18; }
      }
    }

    /* --- gambar badan lunak --- */
    draw(ctx) {
      const pts = this.pts, N = this.N, c = this.col;
      const s = (this.masukScale != null) ? Math.max(0.1, this.masukScale) : 1;
      const R = this.r * s;

      // bayangan lembut (mengecil saat badan mengecil)
      const gy = AK.groundYAt(this.cx);
      const air = clamp((gy - this.cy - R) / 240, 0, 1);
      ctx.save();
      ctx.globalAlpha = 0.20 * s * (1 - air * 0.65);
      ctx.fillStyle = '#2f5d3a';
      ctx.beginPath();
      ctx.ellipse(this.cx, gy - 3, R * (1.22 + air * 0.35), R * 0.28, 0, 0, TAU);
      ctx.fill();
      ctx.restore();

      // jalur mulus lewat titik tengah antar titik
      ctx.beginPath();
      let p0 = pts[N - 1], p1 = pts[0];
      ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
      for (let i = 0; i < N; i++) {
        const p = pts[i], q = pts[(i + 1) % N];
        ctx.quadraticCurveTo(p.x, p.y, (p.x + q.x) / 2, (p.y + q.y) / 2);
      }
      ctx.closePath();

      const grad = ctx.createRadialGradient(
        this.cx - R * 0.35, this.cy - R * 0.42, R * 0.12,
        this.cx, this.cy, R * 1.38
      );
      grad.addColorStop(0, c.light);
      grad.addColorStop(0.55, c.base);
      grad.addColorStop(1, c.dark);
      ctx.fillStyle = grad;
      ctx.fill();
      // garis tepi samar — tokoh tetap menonjol di atas properti senada
      ctx.strokeStyle = 'rgba(40,32,22,.18)';
      ctx.lineWidth = 1.6 * s;
      ctx.stroke();

      // kilau tepi & kilau kaca (klip di dalam badan)
      ctx.save();
      ctx.clip();
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = c.rim;
      ctx.lineWidth = R * 0.16;
      ctx.beginPath();
      ctx.arc(this.cx - R * 0.08, this.cy - R * 0.10, R * 0.86, Math.PI * 1.02, Math.PI * 1.72);
      ctx.stroke();
      ctx.globalAlpha = 0.42;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(this.cx - R * 0.32, this.cy - R * 0.44, R * 0.30, R * 0.12, -0.55, 0, TAU);
      ctx.fill();
      ctx.restore();
    }
  }

  return Jelly;
})();

/* ---------- Akio: pemandu emas yang melayang ---------- */
AK.Akio = (function () {
  const TAU = AK.TAU, rand = AK.rand;

  class Akio {
    constructor(x, y) {
      this.baseX = x; this.baseY = y;
      this.cx = x; this.cy = y;
      this.r = 30;
      this.t = rand(0, 9);
      this.col = { base: '#f6c453', light: '#ffe9ad', dark: '#d98f2b', rim: 'rgba(255,246,200,.9)' };
      this.N = 14;
      this.pts = [];
      for (let i = 0; i < this.N; i++) {
        const a = i / this.N * TAU;
        this.pts.push({ a, x: x + Math.cos(a) * this.r, y: y + Math.sin(a) * this.r, vx: 0, vy: 0 });
      }
      this.bounce = 0;
      this.trail = [];
    }

    poke() {
      this.bounce = 1;
      for (const p of this.pts) { p.vy -= 240; p.vx += rand(-90, 90); }
    }

    update(dt) {
      this.t += dt;
      const hoverY = this.baseY + Math.sin(this.t * 1.6) * 9;
      this.cx = this.baseX + Math.sin(this.t * 0.45) * 26;
      this.cy = hoverY;
      if (this.bounce > 0) this.bounce = Math.max(0, this.bounce - dt * 1.6);

      const damp = Math.pow(0.88, dt * 60);
      for (let i = 0; i < this.N; i++) {
        const p = this.pts[i];
        const a = p.a + Math.sin(this.t * 1.1) * 0.08;
        const tx = this.cx + Math.cos(a) * this.r;
        const ty = this.cy + Math.sin(a) * this.r * (1 - this.bounce * 0.25);
        p.vx += (tx - p.x) * 150 * dt;
        p.vy += (ty - p.y) * 150 * dt;
        const pr = this.pts[(i - 1 + this.N) % this.N];
        const nx = this.pts[(i + 1) % this.N];
        p.vx += ((pr.x + nx.x) / 2 - p.x) * 320 * dt;
        p.vy += ((pr.y + nx.y) / 2 - p.y) * 320 * dt;
        p.vx *= damp; p.vy *= damp;
        p.x += p.vx * dt; p.y += p.vy * dt;
      }

      // jejak kilau
      if (!AK.reducedMotion) {
        this.trail.push({ x: this.cx + rand(-4, 4), y: this.cy + rand(-2, 8), a: 0.85, r: rand(1.4, 3) });
        if (this.trail.length > 16) this.trail.shift();
      }
      for (const s of this.trail) s.a -= dt * 2.2;   // jejak padam serentak — tak ada titik nyangkut
    }

    draw(ctx, glow) {
      // aura
      if (glow) {
        ctx.save();
        ctx.globalAlpha = 0.35 + Math.sin(this.t * 2) * 0.08;
        ctx.drawImage(glow, this.cx - 66, this.cy - 66, 132, 132);
        ctx.restore();
      }
      // jejak
      for (const s of this.trail) {
        if (s.a <= 0) continue;
        ctx.globalAlpha = Math.max(0, s.a) * 0.7;
        ctx.fillStyle = '#ffe9ad';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, TAU); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // badan
      const pts = this.pts, N = this.N, c = this.col;
      ctx.beginPath();
      let p0 = pts[N - 1], p1 = pts[0];
      ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
      for (let i = 0; i < N; i++) {
        const p = pts[i], q = pts[(i + 1) % N];
        ctx.quadraticCurveTo(p.x, p.y, (p.x + q.x) / 2, (p.y + q.y) / 2);
      }
      ctx.closePath();
      const grad = ctx.createRadialGradient(
        this.cx - this.r * 0.3, this.cy - this.r * 0.4, this.r * 0.1,
        this.cx, this.cy, this.r * 1.35
      );
      grad.addColorStop(0, c.light);
      grad.addColorStop(0.55, c.base);
      gradColorDark(grad, c.dark);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.save(); ctx.clip();
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = c.rim; ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(this.cx - this.r * 0.08, this.cy - this.r * 0.1, this.r * 0.84, Math.PI * 1.02, Math.PI * 1.72);
      ctx.stroke();
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(this.cx - this.r * 0.3, this.cy - this.r * 0.42, this.r * 0.26, this.r * 0.11, -0.55, 0, TAU);
      ctx.fill();
      ctx.restore();

      // mahkota kecil melayang di atas Akio (bukan wajah — tanda pemandu)
      const ky = this.cy - this.r - 12 + Math.sin(this.t * 2.2) * 3;
      ctx.fillStyle = '#ffe08a';
      ctx.save();
      ctx.translate(this.cx, ky);
      ctx.beginPath();
      for (let i = 0; i <= 4; i++) {
        const px = (i - 2) * 6;
        ctx.lineTo(px, i % 2 === 0 ? -7 : 0);
      }
      ctx.lineTo(12, 5); ctx.lineTo(-12, 5); ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  function gradColorDark(grad, col) { grad.addColorStop(1, col); }

  return Akio;
})();
