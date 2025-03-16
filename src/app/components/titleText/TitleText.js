'use client';
import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
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
        noiseStrength: 1,                                                                   // 控制粒子浮動範圍
        spreadFactor: 150,                                                                  // 控制粒子分佈範圍
        driftFactor: 0.5,                                                                   // 漂移影響力，讓粒子不會死守 target
        targetDriftChance: 0.1,                                                             // 控制漂移影響機率
        stabilityThreshold: 3,                                                              // 提高穩定範圍
        gaussianStrength: 0.1,                                                              // 高斯分佈影響力度
        colorTolerance: 10,                                                                 // 允許粒子判定的顏色範圍
        imageScale: 1,                                                                      // 縮小圖片比例
        particleSize: 10,                                                                   // 粒子文字大小
        canvasScale: 1.5,                                                                   // 畫布內縮放

        // 發射與回歸的參數 #############################################################################################################
        escapeChance: 0.00015,                                                              // 粒子每幀發射的機率
        escapePower: () => randomRange(10, randomRange(20, 100)),                           // 粒子發射的力量
        escapeDuration: () => randomRange(120, 180),                                        // 粒子脫離後，多久才開始回歸
        escapeNoiseStrength: 4,                                                             // 發射過程中 `noise()` 擾動的強度
        reboundForce: 0.025,                                                                // 回歸時的吸引力強度
        recoveryFactorScale: 0.01,                                                          // 回歸因子係數縮放
        collapseAngle: () => randomRange(1, randomRange(2, randomRange(5, 10))),            // 噴射角度（度數），影響發射時的角度範圍
        splashRadius: 4,                                                                    // 濺射範圍，影響周圍多少粒子會被帶動發射
        splashProbability: 0.6,                                                             // 濺射機率，影響範圍內的粒子是否跟著發射
        splashLimit: 20,                                                                    // 限制單次濺射影響的粒子數量

        // 調整 target 附近粒子的抖動行為 ################################################################################################
        nearTargetDamping: 0.8,                                                             // 靠近 `target` 的粒子阻尼係數
        nearTargetNoiseReduction: 0.8,                                                      // 靠近 `target` 時 `noise()` 影響減弱

        // 強制散開 #####################################################################################################################
        scatterFactor: 0,                                                                   // 強制散開 (0 ~ 1.0)
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
            const textBaseWidth = 880;

            p.config = { ...textConfig };
            p.updateConfig = (newConfig) => {
                p.config = { ...newConfig };
            };

            p.preload = () => {
                font = p.loadFont(p.config.fontPath);
                textMask = p.loadImage(p.config.textImagePath);
            };

            function generateParticles() {
                if (!textMask) return;
                particles = [];

                textMask.resize(textBaseWidth * p.config.imageScale, 0);
                textMask.loadPixels();

                const offsetX = (p.width - textMask.width) / 2;
                const offsetY = (p.height - textMask.height) / 2;

                let totalParticles = 0;
                for (let x = 0; x < textMask.width; x += p.config.samplingStep) {
                    for (let y = 0; y < textMask.height; y += p.config.samplingStep) {
                        let c = textMask.get(x, y);
                        let letter = getCharacterByColor(c);
                        if (letter && p.random() < p.config.densityFactor) {
                            particles.push(new Particle(
                                offsetX + (x / p.config.imageScale) * p.config.particleScaleFactor,
                                offsetY + (y / p.config.imageScale) * p.config.particleScaleFactor,
                                letter,
                                c
                            ));
                            totalParticles++;
                            if (totalParticles >= p.config.maxParticles) {
                                return;
                            }
                        }
                    }
                }
                console.log(`Total particles generated: ${particles.length}`);
            }

            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
                generateParticles();
            };

            //   p.windowResized = () => {
            //     p.resizeCanvas(p.windowWidth, p.windowHeight);
            //     generateParticles();
            //   };

            p.draw = () => {
                p.clear();

                p.push();
                p.translate(p.width / 2, p.height / 2);
                p.scale(p.config.canvasScale);
                p.translate(-p.width / 2, -p.height / 2);

                for (let particle of particles) {
                    particle.update();
                    particle.show();
                }
                p.pop();
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
                    // 原始文字輪廓的目標位置
                    this.target = p.createVector(x, y);
                    // 初始位置：稍微偏離目標位置（加入高斯雜訊）
                    this.pos = p.createVector(
                        x + gaussianOffset(p.config.spreadFactor),
                        y + gaussianOffset(p.config.spreadFactor)
                    );
                    // 隨機初始速度
                    this.vel = p5.Vector.random2D().mult(p.config.textMult);
                    this.acc = p.createVector();
                    this.maxSpeed = 3;
                    this.letter = letter;
                    this.color = color;
                    this.noiseOffsetX = p.random(1000);
                    this.noiseOffsetY = p.random(1000);
                    // escape 相關屬性
                    this.isEscaping = false;
                    this.isReturning = false;
                    this.escapeTimer = 0;
                    this.escapeNoiseOffset = p.random(1000);

                    // 建立一個散開目標：以畫布中心為基準，再加上一個隨機位移
                    const center = p.createVector(p.width / 2, p.height / 2);
                    const maxRadius = 400; // 散開最大半徑（可依需求調整）
                    let randomVec = p5.Vector.random2D().mult(p.random(maxRadius));
                    this.scatteredPos = p5.Vector.add(center, randomVec);
                }

                update() {
                    // 以 scatterFactor (0~1) 決定最終目標位置
                    // scatterFactor 為 0 時最終目標為 this.target；為 1 時為 this.scatteredPos
                    const finalTarget = p5.Vector.lerp(this.target, this.scatteredPos, p.config.scatterFactor);

                    // 計算指向 finalTarget 的向量
                    let force = p5.Vector.sub(finalTarget, this.pos);
                    let distance = force.mag();
                    let isNearTarget = distance < p.config.stabilityThreshold;

                    // 當粒子靠近目標時，有一定機率觸發 escape 行為
                    if (!this.isEscaping && isNearTarget && p.random() < p.config.escapeChance) {
                        this.triggerEscape();
                    }

                    // 如果處於 escape 狀態，加入回歸力與 noise 擾動
                    if (this.isEscaping) {
                        this.escapeTimer--;
                        let pullBackForce = p5.Vector.sub(finalTarget, this.pos);
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
                        // 未 escape 狀態下：如果離最終目標太遠，就朝向它施加加速度
                        if (distance > p.config.stabilityThreshold) {
                            force.setMag(p.config.textSpeed);
                            this.acc.add(force);
                        } else {
                            this.vel.mult(p.config.nearTargetDamping);
                            this.isEscaping = false;
                            this.isReturning = false;
                        }
                    }

                    // 更新速度與位置
                    this.vel.add(this.acc);
                    this.vel.limit(this.maxSpeed);
                    this.pos.add(this.vel);
                    this.acc.mult(0);

                    // 處理 noise 與隨機漂移
                    let noiseEffect = p.config.noiseStrength;
                    let driftEffect = p.config.driftFactor;
                    if (this.isReturning) {
                        let recoveryFactor = p.map(distance, 0, p.config.stabilityThreshold, 0, 1);
                        noiseEffect *= recoveryFactor * p.config.recoveryFactorScale;
                        driftEffect *= recoveryFactor * p.config.recoveryFactorScale;
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

    const TitleTextComponent = useCallback(({className}) => (
        <div ref={canvasRef} className={`select-none pointer-events-none ${className}`} />
    ), []);
    return { textConfig, updateConfig, TitleTextComponent };
}
