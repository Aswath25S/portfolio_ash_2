import { content } from '../data/content';

export function downloadResume() {
  const c = content;
  let out = 'ASWATH SURESH\nJack of many trades, master of one degree.\naswathsureshjhu@gmail.com | linkedin.com/in/aswathsuresh25 | github.com/Aswath25S\n\n';
  out += 'EDUCATION\nJohns Hopkins University — MS, Data Science (GPA 3.96), 2026\nIIT Bombay — B.Tech, Aerospace Engineering, 2022\n\n';

  const secs: Array<[string, 'tech' | 'consulting' | 'leadership']> = [
    ['TECH & DATA SCIENCE', 'tech'],
    ['CONSULTING', 'consulting'],
    ['LEADERSHIP', 'leadership'],
  ];
  secs.forEach(([label, key]) => {
    out += label + '\n';
    c[key].roles.forEach((r) => {
      out += '\n' + r.role + ' | ' + r.org + ' | ' + r.place + ' | ' + r.dates + '\n';
      out += '  - ' + r.summary + '\n';
    });
    out += '\n';
  });

  out += 'PROJECTS\n';
  c.tech.projects.forEach((p) => {
    out += '\n' + p.name + ' (' + p.meta + ')\n';
    out += '  - ' + p.summary + '\n';
  });

  out += '\nSKILLS\nTechnical: ' + c.tech.skillsTech.join(', ') + '\nDomain: ' + c.tech.skillsDomain.join(', ') + '\n';

  const blob = new Blob([out], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Aswath_Suresh_Resume.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
