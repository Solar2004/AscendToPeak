/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product, JournalArticle } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Face & Bone Structure Analysis',
    tagline: 'Data-driven physiognomy.',
    description: 'Comprehensive facial analysis using proprietary computer vision algorithms. Detailed report on asymmetry, ratios, and potential maxxing vectors.',
    longDescription: 'Stop guessing. Our state-of-the-art software maps 140+ facial landmarks to provide a clinical assessment of your craniofacial development. The package includes a 15-page PDF report covering mandibular plane angle, gonial prominence, and midface ratios, along with actionable hardmaxx and softmaxx protocols tailored to your specific phenotype.',
    price: 199,
    category: 'Software',
    imageUrl: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?auto=format&fit=crop&q=80&w=1000',
    features: ['Computer Vision Mapping', 'Asymmetry Detection', 'Softmaxx Protocol', 'Surgical Recommendations']
  },
  {
    id: 'p2',
    name: 'Cycle Architecture with Dr. K',
    tagline: 'Professional endocrinology guidance.',
    description: '1-on-1 consultation for research cycle planning. Harm reduction, bloodwork analysis, and compound sequencing.',
    longDescription: 'Research involving PEDs requires precision. Work directly with our licensed endocrinologist to design a research cycle that minimizes volatility. Service includes pre-cycle bloodwork interpretation, compound selection (for research purposes only), and PCT protocols. Strict medical confidentiality maintained.',
    price: 350,
    category: 'Coaching',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
    features: ['Bloodwork Analysis', 'PCT Protocol', 'Liver Support Guidance', '1hr Encrypted Call']
  },
  {
    id: 'p3',
    name: 'BPC-157 (Stable)',
    tagline: 'Systemic repair peptide.',
    description: 'Laboratory grade pentadecapeptide. 5mg vial. Janoshik Verified >99% Purity. STRICT MEDICAL PRESCRIPTION REQUIRED.',
    longDescription: 'For research purposes only. BPC-157 is a partial sequence of body protection compound. Our lyophilized powder is stabilized for maximum shelf life. Every batch is third-party tested by Janoshik Analytics to ensure purity and verify concentration. Upload of valid medical prescription or research license required before shipment.',
    price: 65,
    category: 'Peptides',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000',
    features: ['Janoshik Verified', '>99% Purity', 'Lyophilized', 'Research Use Only']
  },
  {
    id: 'p4',
    name: 'Ascend App: Pro',
    tagline: 'Quantify your ascension.',
    description: 'Access to our exclusive mobile application. Track biometrics, cycle logs, and access the doctor network.',
    longDescription: 'The Ascend App is the command center for your bio-optimization. Features include graphical tracking of weight, body fat %, and lift PRs overlayed with your protocol timeline. Includes direct chat access to our verified medical team and the "Looksmaxxing" community forum. Invite only.',
    price: 29,
    category: 'Software',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    features: ['Biometric Dashboard', 'Protocol Logger', 'Doctor Chat', 'Progress Graphics']
  },
  {
    id: 'p5',
    name: 'MK-677 (Ibutamoren)',
    tagline: 'Growth hormone secretagogue.',
    description: 'Solution 25mg/ml. Increases IGF-1 levels. Janoshik Verified. STRICT MEDICAL PRESCRIPTION REQUIRED.',
    longDescription: 'Investigational compound for research purposes. MK-677 signals the pituitary gland to secrete growth hormone. Frequently researched for sleep quality improvement and nitrogen retention. Batch #4029 verified by Janoshik. Not for human consumption without prescription.',
    price: 85,
    category: 'SARMs',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=1000',
    features: ['Janoshik Verified', 'Liquid Solution', 'IGF-1 Research', 'Dropper Included']
  },
  {
    id: 'p7',
    name: 'RAD-140 (Testolone)',
    tagline: 'Selective Androgen Receptor Modulator.',
    description: 'High specificity binding. 10mg/ml - 30ml. Janoshik Verified 99.8%. STRICT MEDICAL PRESCRIPTION REQUIRED.',
    longDescription: 'RAD-140 is a potent SARM being investigated for its potential to increase muscle mass with reduced androgenic side effects compared to traditional anabolics. This product is sold strictly for in-vitro laboratory research. Not for human use.',
    price: 95,
    category: 'SARMs',
    imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=1000',
    features: ['Janoshik Verified', 'Anabolic Research', 'Suspension', 'Safety Seal']
  },
  {
    id: 'p6',
    name: 'GHK-Cu (Copper Peptide)',
    tagline: 'Skin and remodeling.',
    description: 'Topical/Injectable research grade. Known for skin elasticity and collagen synthesis research.',
    longDescription: 'A naturally occurring copper complex. In research settings, GHK-Cu is observed to tighten loose skin, improve elasticity, and reduce fine lines. Often paired with microneedling protocols in a clinical setting. High purity blue powder.',
    price: 45,
    category: 'Peptides',
    imageUrl: 'https://images.unsplash.com/photo-1624726175512-19b9baf00ca9?auto=format&fit=crop&q=80&w=1000',
    features: ['Collagen Synthesis', '98% Purity', 'Blue Lyophilized', 'Anti-Aging Research']
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
    {
        id: 1,
        title: "The Wolff's Law Protocol",
        date: "Research Log #401",
        excerpt: "Methods for stimulating bone density remodeling via mechanical stress.",
        image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-zinc-400 font-mono text-sm" },
                "Access Level: Public | Author: Dr. S. Chen"
            ),
            React.createElement("p", { className: "mb-6 first-letter:text-3xl first-letter:text-cyan-400 first-letter:mr-3 first-letter:float-left text-zinc-300" },
                "Bone is not static. It is a piezoelectric material that remodels under load. Wolff's Law dictates that bone in a healthy person or animal will adapt to the loads under which it is placed."
            ),
            React.createElement("p", { className: "mb-8 text-zinc-300" },
                "In our community research, we have observed that specific mastication protocols, combined with intermittent fasting (to spike HGH), can lead to measurable changes in gonial angle density over 12-24 month periods."
            ),
            React.createElement("div", { className: "my-10 p-6 border-l-2 border-cyan-500 bg-zinc-900/50 text-zinc-200" },
                React.createElement("strong", { className: "block mb-2 text-cyan-400 font-mono uppercase" }, "Hypothesis"),
                "Controlled mechanical stress > Bone deposition > Aesthetic angularity."
            )
        )
    },
    {
        id: 2,
        title: "Peptide Stability Analysis",
        date: "Janoshik Report",
        excerpt: "Why your fridge temperature matters. BPC-157 degradation rates.",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-zinc-300" },
                "We sent 10 samples of reconstituted BPC-157 to Janoshik Analytics. 5 were kept at 4°C, 5 were left at room temperature (21°C)."
            ),
            React.createElement("p", { className: "mb-8 text-zinc-300" },
                "The results were alarming for the casual researcher. Room temperature degradation began within 48 hours, losing 12% potency by day 5. The refrigerated samples maintained 99.2% integrity over 14 days."
            ),
            React.createElement("div", { className: "p-4 bg-red-900/20 border border-red-900/50 text-red-200 text-sm font-mono" },
                "WARNING: Do not reconstitute until ready for immediate research cycle."
            )
        )
    },
    {
        id: 3,
        title: "Chronos AI Integration",
        date: "System Update v2.4",
        excerpt: "Implementing LLMs for cycle analysis and interaction checking.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-zinc-300" },
                "We have integrated the new 'Chronos' model into the platform. Trained on thousands of endocrinology papers and anecdotal logs from the community."
            ),
            React.createElement("p", { className: "mb-8 text-zinc-300" },
                "Chronos can now assist with: Compound half-life calculation, PCT timing estimation, and identifying potential contraindications in your research stack."
            )
        )
    }
];

export const BRAND_NAME = 'ASCEND TO PEAK';
export const PRIMARY_COLOR = 'zinc-950'; 
export const ACCENT_COLOR = 'cyan-500';
