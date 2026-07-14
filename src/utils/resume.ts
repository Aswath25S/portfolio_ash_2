import resumeUrl from '../assets/Aswath_Suresh_Resume.pdf';

export function downloadResume() {
  const a = document.createElement('a');
  a.href = resumeUrl;
  a.download = 'Aswath_Suresh_Resume.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
