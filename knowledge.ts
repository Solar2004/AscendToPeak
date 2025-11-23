
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface KnowledgeChunk {
    id: string;
    title: string;
    category: 'Protocol' | 'Compound' | 'Philosophy' | 'Safety' | 'Biology';
    content: string;
    relatedIds: string[]; // IDs of other chunks this concept connects to
    vector_sim: string[]; // Weighted keywords for simulated vector embedding
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
    {
        id: 'k1',
        title: 'BPC-157: Mechanism & Stability',
        category: 'Compound',
        vector_sim: ['peptide', 'healing', 'gastric', 'tendon', 'repair', 'angiogenesis', 'storage', 'degradation', 'bpc157'],
        content: `BPC-157 (Body Protection Compound-157) is a pentadecapeptide derived from human gastric juice.
        
        Mechanism of Action:
        - Angiogenesis: Up-regulates VEGFR2 expression, promoting new blood vessel formation.
        - Fibroblast Recruitment: Accelerates soft tissue repair (tendons/ligaments).
        
        Stability Protocol (Janoshik verified):
        - Lyophilized (Powder): Stable at room temp (20°C) for 10 weeks. Long-term: -20°C.
        - Reconstituted (Liquid): MUST be at 2-8°C. Half-life reduces significantly >48hrs at room temp.`,
        relatedIds: ['k5', 'k8', 'k4']
    },
    {
        id: 'k2',
        title: 'Wolff\'s Law: Osteogenic Adaptation',
        category: 'Biology',
        vector_sim: ['bone', 'density', 'jaw', 'chewing', 'stress', 'mechanical', 'wolff', 'remodeling', 'face', 'structure'],
        content: `Wolff's Law posits that bone in a healthy person or animal will adapt to the loads under which it is placed.
        
        Biological Process:
        1. Mechanotransduction: Osteocytes detect mechanical strain.
        2. Osteoblast Activation: Bone deposition occurs at stress points (e.g., gonial angle of mandible).
        3. Osteoclast Inhibition: Reduced resorption in loaded areas.
        
        Aesthetic Application:
        High-resistance mastication (chewing) creates strain on the mandibular ramus, potentially increasing bone density and width over extended periods (18-24 months).`,
        relatedIds: ['k7', 'k9', 'k6']
    },
    {
        id: 'k3',
        title: 'MK-677: Ghrelin Mimetic',
        category: 'Compound',
        vector_sim: ['mk677', 'ibutamoren', 'growth', 'gh', 'igf1', 'hunger', 'sleep', 'secretagogue'],
        content: `MK-677 (Ibutamoren) is a non-peptide selective agonist of the ghrelin receptor (GHS-R1a).
        
        Pathway:
        - Binds to GHS-R1a in the pituitary and hypothalamus.
        - Stimulates pulsatile release of Growth Hormone (GH).
        - Increases downstream IGF-1 (Insulin-like Growth Factor 1) levels.
        
        Observations:
        - Does NOT suppress natural testosterone production.
        - Increases REM sleep latency and total REM duration.
        - Induces significant appetite increase via ghrelin signaling.`,
        relatedIds: ['k5', 'k10', 'k11']
    },
    {
        id: 'k4',
        title: 'GHK-Cu: Dermal Remodeling',
        category: 'Protocol',
        vector_sim: ['skin', 'collagen', 'aging', 'copper', 'peptide', 'ghk', 'wrinkles', 'elasticity'],
        content: `GHK-Cu (Glycyl-L-Histidyl-L-Lysine copper complex) regulates metalloproteinases.
        
        Dermal Effects:
        - Resets gene expression in fibroblasts to a younger state.
        - Stimulates Types I and III collagen synthesis.
        - Anti-inflammatory properties reduce oxidative stress in skin cells.
        
        Research Protocol:
        Topical application (1-3% concentration) or subcutaneous micro-injections for systemic elasticity.`,
        relatedIds: ['k1', 'k8']
    },
    {
        id: 'k5',
        title: 'Janoshik Analytics Protocol',
        category: 'Safety',
        vector_sim: ['testing', 'verification', 'purity', 'safety', 'analysis', 'chromatography', 'fake', 'lab'],
        content: `Janoshik Analytics (Prague) serves as the primary verification node for the research community.
        
        Methodology:
        - HPLC (High-Performance Liquid Chromatography) to determine purity %.
        - MS (Mass Spectrometry) to confirm compound identity.
        
        Ascend Protocol:
        Batch codes on all vials link directly to Janoshik public archives. We reject any batch testing under 98.5% purity.`,
        relatedIds: ['k1', 'k3', 'k12']
    },
    {
        id: 'k6',
        title: 'Philosophy: Programmable Biology',
        category: 'Philosophy',
        vector_sim: ['mission', 'ascend', 'transhumanism', 'optimization', 'biohacking', 'self-improvement'],
        content: `The core tenant of Ascend to Peak is that biology is not destiny; it is a baseline.
        
        Vectors of Change:
        1. Hardmaxx (Endocrine/Surgical): Modifying the hardware. High risk, high reward.
        2. Softmaxx (Dermal/Nutritional): Optimizing the surface.
        
        We provide the data layer (software) and the supply chain (compounds) to execute these changes safely under medical supervision.`,
        relatedIds: ['k2', 'k7', 'k12']
    },
    {
        id: 'k7',
        title: 'Computer Vision Facial Metrics',
        category: 'Protocol',
        vector_sim: ['software', 'face', 'analysis', 'fwhr', 'ratios', 'aesthetics', 'measurement', 'golden'],
        content: `Our analysis software utilizes 140-point landmark detection.
        
        Key Biometrics:
        - FWHR (Facial Width-to-Height Ratio): Correlated with testosterone exposure and perceived dominance. Ideal range > 1.90.
        - Midface Ratio: Distance between pupils vs. mouth. Compact midface indicates optimal maxilla forward growth.
        - Bigonial Width: Jaw width measured at the gonion.
        
        This data allows for targeted intervention rather than generic advice.`,
        relatedIds: ['k2', 'k6']
    },
    {
        id: 'k8',
        title: 'Angiogenesis & Tissue Repair',
        category: 'Biology',
        vector_sim: ['blood', 'vessels', 'healing', 'vegf', 'circulation', 'recovery'],
        content: `Angiogenesis is the physiological process through which new blood vessels form from pre-existing vessels.
        
        relevance to Peptides:
        Compounds like BPC-157 and TB-500 significantly upregulate VEGF (Vascular Endothelial Growth Factor).
        This increased vascularity ensures nutrient delivery to avascular tissues like tendons and ligaments, which typically heal slowly due to poor blood flow.`,
        relatedIds: ['k1', 'k4']
    },
    {
        id: 'k9',
        title: 'Mastication & Craniofacial Development',
        category: 'Biology',
        vector_sim: ['chewing', 'jaw', 'muscle', 'masseter', 'growth', 'development'],
        content: `The masseter muscle is one of the strongest muscles in the human body.
        
        Hypertrophy:
        Like any skeletal muscle, the masseter undergoes hypertrophy (growth) under progressive overload.
        Increased masseter volume adds lateral width to the lower third of the face, contributing to a "square" jawline appearance, independent of bone structure changes.`,
        relatedIds: ['k2']
    },
    {
        id: 'k10',
        title: 'IGF-1 Signaling Pathway',
        category: 'Biology',
        vector_sim: ['igf1', 'insulin', 'growth', 'anabolic', 'muscle', 'cell'],
        content: `Insulin-like Growth Factor 1 (IGF-1) is a hormone similar in molecular structure to insulin.
        
        Role:
        - It plays an important role in childhood growth and continues to have anabolic effects in adults.
        - Mediates the effects of GH. GH is made in the pituitary -> stimulates liver to produce IGF-1 -> IGF-1 stimulates systemic cell growth.
        
        Elevated IGF-1 is the primary target of MK-677 research for hyperplasia and nitrogen retention.`,
        relatedIds: ['k3', 'k11']
    },
    {
        id: 'k11',
        title: 'Sleep Architecture & Recovery',
        category: 'Biology',
        vector_sim: ['sleep', 'rem', 'deep', 'recovery', 'brain', 'circadian'],
        content: `Sleep architecture refers to the basic structural organization of normal sleep.
        
        Stages:
        - NREM (Non-Rapid Eye Movement): Deep physical repair. GH is secreted primarily during N3 (Deep Sleep).
        - REM (Rapid Eye Movement): Neural repair and memory consolidation.
        
        Impact of Secretagogues:
        Compounds increasing GH pulses (like MK-677) often intensify REM density, leading to vivid dreams and improved cognitive recovery.`,
        relatedIds: ['k3', 'k10']
    },
    {
        id: 'k12',
        title: 'Research Ethics & Harm Reduction',
        category: 'Safety',
        vector_sim: ['safety', 'risk', 'side-effects', 'ethics', 'medical', 'doctor'],
        content: `The 'Ascend' protocol emphasizes Harm Reduction over reckless experimentation.
        
        Key Pillars:
        1. Pre-Cycle Bloodwork: Establish baseline Lipids, Liver Enzymes (ALT/AST), and Testosterone.
        2. Source Verification: Only using chromatographically tested compounds (Janoshik).
        3. Medical Oversight: Professional endocrinologist consultation for all hormonal modulation.`,
        relatedIds: ['k5', 'k6']
    }
];
