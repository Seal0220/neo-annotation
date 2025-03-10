'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import p5 from 'p5';

import { randomRange } from '@/app/functions/utils';

export default function useTitleText() {
    const canvasRef = useRef(null);
    const p5InstanceRef = useRef(null); // 用來儲存 p5 實例

    const [textConfig, setTextConfig] = useState({
        textImagePath: '/titleText/neo-annotation_mask.png',                                // 遮罩圖片路徑
        fontPath: '/titleText/AmericanTypewriterStd-BdCnd.otf',                             // 指定字體
        maxParticles: 10000,                                                                // 設定最大粒子數
        densityFactor: 0.35,                                                                // 粒子密度 (0.1 ~ 1.0, 越低粒子越少)
        particleScaleFactor: 1,                                                             // 粒子大小縮放比例
        samplingStep: 2,                                                                    // 取樣步長，數值越小，粒子越密集
        textMult: 0.5,                                                                      // 粒子初始移動速度
        textSpeed: 0.7,                                                                     // 控制粒子回歸目標的速度
        noiseScale: 0.3,                                                                    // 控制 noise() 影響程度
        noiseStrength: 0.25,                                                                // 控制粒子浮動範圍
        spreadFactor: 100,                                                                  // 控制粒子分佈範圍
        driftFactor: 0.5,                                                                   // 漂移影響力，讓粒子不會死守 target
        targetDriftChance: 0.1,                                                             // 控制漂移影響機率
        stabilityThreshold: 1.5,                                                            // 提高穩定範圍
        gaussianStrength: 0.1,                                                              // 高斯分佈影響力度
        colorTolerance: 10,                                                                 // 允許粒子判定的顏色範圍
        imageScale: 1,                                                                      // 縮小圖片比例
        particleSize: 9,                                                                    // 粒子文字大小

        // 發射與回歸的參數 #############################################################################################################
        escapeChance: 0.00025,                                                              // 粒子每幀發射的機率
        escapePower: () => randomRange(1, randomRange(3, 5)),                               // 粒子發射的力量
        escapeDuration: () => randomRange(80, 120),                                         // 粒子脫離後，多久才開始回歸
        escapeNoiseStrength: 2,                                                             // 發射過程中 `noise()` 擾動的強度
        reboundForce: 0.05,                                                                 // 回歸時的吸引力強度
        collapseAngle: () => randomRange(1, randomRange(3, randomRange(3, 30))),            // 噴射角度（度數），影響發射時的角度範圍
        splashRadius: 4,                                                                    // 濺射範圍，影響周圍多少粒子會被帶動發射
        splashProbability: 0.6,                                                             // 濺射機率，影響範圍內的粒子是否跟著發射
        splashLimit: 20,                                                                    // 限制單次濺射影響的粒子數量


        // 調整 target 附近粒子的抖動行為 ################################################################################################
        nearTargetDamping: 0.8,                                                             // 靠近 `target` 的粒子阻尼係數
        nearTargetNoiseReduction: 0.8,                                                      // 靠近 `target` 時 `noise()` 影響減弱
    });

    const updateConfig = (key, valueOrUpdater) => {
        setTextConfig((prevConfig) => {
          const newValue =
            typeof valueOrUpdater === 'function'
              ? valueOrUpdater(prevConfig[key])
              : valueOrUpdater;
          return { ...prevConfig, [key]: newValue };
        });
      };
      

    // 初始化 p5 實例（僅掛載時執行一次）
    useEffect(() => {
        const sketch = (p) => {
            let font;
            let particles = [];
            let textMask;

            // 將初始配置儲存在 p 內
            p.config = { ...textConfig };

            // 定義一個方法讓外部可以更新 p 內的配置
            p.updateConfig = (newConfig) => {
                p.config = { ...newConfig };
            };

            p.preload = () => {
                font = p.loadFont(p.config.fontPath);
                textMask = p.loadImage(p.config.textImagePath);
            };

            p.setup = () => {
                p.createCanvas(880, 240).parent(canvasRef.current);
                textMask.resize(p.width * p.config.imageScale, 0);
                textMask.loadPixels();

                let totalParticles = 0;
                for (let x = 0; x < textMask.width; x += p.config.samplingStep) {
                    for (let y = 0; y < textMask.height; y += p.config.samplingStep) {
                        let c = textMask.get(x, y);
                        let letter = getCharacterByColor(c);
                        if (letter && p.random() < p.config.densityFactor) {
                            particles.push(new Particle(
                                (x / p.config.imageScale) * p.config.particleScaleFactor,
                                (y / p.config.imageScale) * p.config.particleScaleFactor,
                                letter, c
                            ));
                            totalParticles++;
                            if (totalParticles >= p.config.maxParticles) {
                                return;
                            }
                        }
                    }
                }
                console.log(`Total particles generated: ${particles.length}`);
            };

            p.draw = () => {
                p.background(255);
                for (let particle of particles) {
                    particle.update();
                    particle.show();
                }
            };

            function getCharacterByColor(color) {
                let r = p.red(color);
                let g = p.green(color);
                let b = p.blue(color);
                if (isColorMatch(r, g, b, 255, 0, 0)) return "n";
                if (isColorMatch(r, g, b, 255, 136, 0)) return "e";
                if (isColorMatch(r, g, b, 251, 255, 0)) return "o";
                if (isColorMatch(r, g, b, 64, 255, 0)) return "-";
                if (isColorMatch(r, g, b, 0, 255, 208)) return "a";
                if (isColorMatch(r, g, b, 229, 0, 255)) return "t";
                if (isColorMatch(r, g, b, 0, 26, 255)) return "i";
                return null;
            }

            function isColorMatch(r, g, b, targetR, targetG, targetB) {
                return (
                    Math.abs(r - targetR) < p.config.colorTolerance &&
                    Math.abs(g - targetG) < p.config.colorTolerance &&
                    Math.abs(b - targetB) < p.config.colorTolerance
                );
            }

            function gaussianOffset(factor = 1) {
                return p.randomGaussian() * factor;
            }

            class Particle {
                constructor(x, y, letter, color) {
                    this.target = p.createVector(x, y);
                    this.pos = p.createVector(
                        x + gaussianOffset(p.config.spreadFactor),
                        y + gaussianOffset(p.config.spreadFactor)
                    );
                    this.vel = p5.Vector.random2D().mult(p.config.textMult);
                    this.acc = p.createVector();
                    this.maxSpeed = 3;
                    this.letter = letter;
                    this.color = color;
                    this.noiseOffsetX = p.random(1000);
                    this.noiseOffsetY = p.random(1000);
                    this.isEscaping = false;
                    this.isReturning = false;
                    this.escapeTimer = 0;
                    this.escapeNoiseOffset = p.random(1000);
                }

                update() {
                    let force = p5.Vector.sub(this.target, this.pos);
                    let distance = force.mag();
                    let isNearTarget = distance < p.config.stabilityThreshold;

                    if (!this.isEscaping && isNearTarget && p.random() < p.config.escapeChance) {
                        this.triggerEscape();
                    }

                    if (this.isEscaping) {
                        this.escapeTimer--;
                        let pullBackForce = p5.Vector.sub(this.target, this.pos);
                        pullBackForce.setMag(p.config.reboundForce);
                        this.vel.add(pullBackForce);
                        let noiseX = (p.noise(this.escapeNoiseOffset + p.millis() * 0.002) - 0.5) * p.config.escapeNoiseStrength;
                        let noiseY = (p.noise(this.escapeNoiseOffset + p.millis() * 0.002 + 500) - 0.5) * p.config.escapeNoiseStrength;
                        this.pos.add(noiseX, noiseY);
                        if (this.escapeTimer <= 0) {
                            this.isEscaping = false;
                            this.isReturning = true;
                        }
                    } else {
                        if (distance > p.config.stabilityThreshold) {
                            force.setMag(p.config.textSpeed);
                            this.acc.add(force);
                        } else {
                            this.vel.mult(p.config.nearTargetDamping);
                            this.isEscaping = false;
                            this.isReturning = false;
                        }
                    }

                    this.vel.add(this.acc);
                    this.vel.limit(this.maxSpeed);
                    this.pos.add(this.vel);
                    this.acc.mult(0);

                    let noiseEffect = p.config.noiseStrength;
                    let driftEffect = p.config.driftFactor;
                    if (this.isReturning) {
                        let recoveryFactor = p.map(distance, 0, p.config.stabilityThreshold, 0, 1);
                        noiseEffect *= recoveryFactor * 0.25;
                        driftEffect *= recoveryFactor * 0.25;
                    }

                    let floatX = (p.noise(this.noiseOffsetX + p.millis() * p.config.noiseScale) - 0.5) * noiseEffect;
                    let floatY = (p.noise(this.noiseOffsetY + p.millis() * p.config.noiseScale + 500) - 0.5) * noiseEffect;
                    this.pos.add(p.createVector(floatX, floatY));

                    if (p.random() < p.config.targetDriftChance) {
                        let driftX = p.random(-driftEffect, driftEffect);
                        let driftY = p.random(-driftEffect, driftEffect);
                        this.pos.add(p.createVector(driftX, driftY));
                    }
                }

                triggerEscape(escapeDirection = null) {
                    if (this.isEscaping) return;
                    this.isEscaping = true;
                    this.isReturning = false;
                    this.escapeTimer = p.config.escapeDuration();
                    if (!escapeDirection) {
                        let baseAngle = p.random(p.TWO_PI);
                        escapeDirection = baseAngle + p.radians(p.random(-p.config.collapseAngle() / 2, p.config.collapseAngle() / 2));
                    }
                    let escapeVelocity = p5.Vector.fromAngle(escapeDirection).mult(p.config.escapePower());
                    this.vel.add(escapeVelocity);
                    let splashCount = 0;
                    for (let particle of particles) {
                        let d = p.dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
                        if (d < p.config.splashRadius && !particle.isEscaping && p.random() < p.config.splashProbability) {
                            particle.triggerEscape(escapeDirection);
                            splashCount++;
                            if (splashCount >= p.config.splashLimit) break;
                        }
                    }

                }

                show() {
                    p.fill(0);
                    p.noStroke();
                    p.textSize(p.config.particleSize);
                    p.text(this.letter, this.pos.x, this.pos.y);
                }
            }
        };

        p5InstanceRef.current = new p5(sketch);
        return () => p5InstanceRef.current.remove();
    }, []); // 依賴陣列為空，僅初始化一次

    // 當 textConfig 更新時，通知 p5 實例更新內部的配置
    useEffect(() => {
        if (p5InstanceRef.current && p5InstanceRef.current.updateConfig) {
            p5InstanceRef.current.updateConfig(textConfig);
        }
    }, [textConfig]);

    const TitleTextComponent = useCallback(() => <div ref={canvasRef}></div>, []);
    return { textConfig, updateConfig, TitleTextComponent };
}
