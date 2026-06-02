type Location = '書斎' | 'リビング' | '庭園';
type SuspectName = '山田（執事）' | '佐藤（妻）' | '鈴木（友人）';

interface Evidence {
  name: string;
  description: string;
  recoveryAP?: number;
  bonusMaxAP?: number;
}

interface Suspect {
  name: SuspectName;
  alibi: string;
  secret: string;
  hasGuiltElement: boolean;
  isIntimidating?: boolean;
}

class WebMysteryGame {
  private foundEvidence: Set<string> = new Set();
  private interrogatedSuspects: Set<SuspectName> = new Set();
  private isGameOver: boolean = false;
  private currentAP: number = 3;
  private maxAP: number = 3;

  private locations: Record<Location, Evidence> = {
    '書斎': { name: '毒薬の瓶', description: '被害者の机から見つかった、不審な空き瓶。' },
    'リビング': { name: 'ちぎれた手紙', description: '暖炉の中に焼け残っていた、「お金が必要だ」と書かれた手紙。' },
    '庭園': { name: '淹れたてのコーヒー', description: 'テラスの水筒。飲むと頭が冴え渡る！', recoveryAP: 1, bonusMaxAP: 1 }
  };

  private suspects: Record<SuspectName, Suspect> = {
    '山田（執事）': { name: '山田（執事）', alibi: 'キッチンで片付けをしていました。', secret: '実は最近、多額の借金を抱えていたようです。', hasGuiltElement: true },
    '佐藤（妻）': { name: '佐藤（妻）', alibi: '自分の部屋で本を読んでいました。', secret: '被害者とは口論が絶えなかったようです。', hasGuiltElement: false },
    '鈴木（友人）': { name: '鈴木（友人）', alibi: '事件の少し前に車で帰宅しました。警察でもないお前に話す義理はない！', secret: '被害者の怪しい薬の噂を調べていた。', hasGuiltElement: false, isIntimidating: true }
  };

  constructor() {
    // 画面が読み込まれたら初期メッセージを表示
    setTimeout(() => {
      this.log("<b>【事件発生】</b> 富豪の館で殺人事件が発生した。");
      this.log(`限られた時間（AP: ${this.maxAP}）の中に犯人を暴け！`);
      this.updateUI();
    }, 100);
  }

  // 画面にメッセージを出力する関数
  private log(message: string, color: string = '#e0e0e0'): void {
    const logWindow = document.getElementById('log-window');
    if (logWindow) {
      logWindow.innerHTML += `<div style="color: ${color}; margin-bottom: 8px;">${message}</div>`;
      logWindow.scrollTop = logWindow.scrollHeight; // 常に最新ログへスクロール
    }
  }

  // 画面の表示（AP、証拠、ボタンの有効/無効）を更新する
  private updateUI(): void {
    const apDisplay = document.getElementById('ap-display');
    const evidenceDisplay = document.getElementById('evidence-display');
    
    if (apDisplay) {
      apDisplay.innerHTML = "⏳".repeat(this.currentAP) + "❌".repeat(this.maxAP - this.currentAP);
    }
    if (evidenceDisplay) {
      evidenceDisplay.innerHTML = `［証拠］: ${this.foundEvidence.size === 0 ? 'なし' : Array.from(this.foundEvidence).join(', ')}`;
    }

    // ゲームオーバーなら全てのボタンを無効化
    if (this.isGameOver) {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(btn => btn.disabled = true);
    }
  }

  private consumeAP(amount: number = 1): void {
    this.currentAP -= amount;
    if (this.currentAP <= 0 && !this.isGameOver) {
      this.log("<br>⏰ <b>【タイムオーバー！】</b>", "#ff4757");
      this.log("夜が明けて警察が到着した。真犯人は闇に紛れて逃げ出してしまった...", "#ff4757");
      this.isGameOver = true;
    }
    this.updateUI();
  }

  // 1. 調査
  public investigate(loc: Location): void {
    if (this.isGameOver) return;
    const evidence = this.locations[loc];

    this.log(`🔍 <b>【${loc}】</b>を調査した...`);
    this.log(`➔ 証拠発見: <b>[${evidence.name}]</b> (${evidence.description})`, "#ffa502");
    this.foundEvidence.add(evidence.name);

    if (evidence.bonusMaxAP) {
      this.maxAP += evidence.bonusMaxAP;
      this.log(`✨ 最大APが ${this.maxAP} に増えた！`, "#2ed573");
    }
    if (evidence.recoveryAP) {
      this.currentAP += evidence.recoveryAP;
      this.log(`☕ コーヒーを飲んでAPが ${evidence.recoveryAP} 回復した！`, "#2ed573");
    }

    this.consumeAP(1);
  }

  // 2. 尋問
  public interrogate(name: SuspectName): void {
    if (this.isGameOver) return;
    const suspect = this.suspects[name];

    this.log(`💬 <b>【${name}】</b>を尋問した...`);
    this.log(`「${suspect.alibi}」`);

    let apCost = 1;
    if (suspect.isIntimidating) {
      this.log(`😱 <b>【精神的プレッシャー！】</b> 凄まじい威圧感に気力を削られた！（追加AP消費）`, "#ff4757");
      apCost = 2;
    }

    if (name === '山田（執事）' && this.foundEvidence.has('ちぎれた手紙')) {
      this.log(`💡 <b>【重要】</b>リビングの手紙を突きつけると動揺した！`, "#2ed573");
      this.log(`➔ 秘密: ${suspect.secret}`, "#2ed573");
      this.interrogatedSuspects.add(name);
    } else if (!suspect.isIntimidating) {
      this.log(`➔ 特に怪しい点は見つからなかった。動揺を誘う証拠が必要かもしれない。`);
    }

    this.consumeAP(apCost);
  }

  // 3. 告白
  public accuse(name: SuspectName): void {
    if (this.isGameOver) return;
    this.isGameOver = true;

    this.log(`<br>👉 <b>「犯人はお前だ！ 【${name}】！」</b>`, "#ff4757");
    this.log("--------------------------------------------------");

    const suspect = this.suspects[name];

    if (suspect.hasGuiltElement && this.interrogatedSuspects.has(name)) {
      this.log("🎉 <b>【完全勝利！ゲームクリア！】</b>", "#2ed573");
      this.log("山田（執事）は崩れ落ち、罪を認めました。「あの手紙を見つけられるとは……お見事です」");
    } else {
      this.log("❌ <b>【誤認逮捕（バッドエンド）】</b>", "#ff4757");
      if (!this.interrogatedSuspects.has(name) && suspect.hasGuiltElement) {
        this.log("山田を疑ったものの、決定的な証拠を突きつけられず煙に巻かれた！");
      } else {
        this.log(`${name}には鉄壁のアリバイがあった。真犯人を逃がしてしまった……。`);
      }
    }
    this.updateUI();
  }
}

// HTML側からボタンクリックで呼び出せるように、window全体に公開する
const game = new WebMysteryGame();
(window as any).game = game;