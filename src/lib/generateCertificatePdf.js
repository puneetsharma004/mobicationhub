import PDFDocument from 'pdfkit';
import getUserProfile from './getUserProfile'; // your helper to fetch user name
import getCourse from './getCourse';

export default async function generateCertificatePdf({ user_id, course_id }) {
  const user = await getUserProfile(user_id);
  const course = await getCourse(course_id);

  const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc.fontSize(40).text('Certificate of Completion', { align: 'center' });
  doc.moveDown(2);
  doc.fontSize(26).text(`${user.full_name}`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(18).text(`has successfully completed the course: ${course.title}`, { align: 'center' });
  doc.moveDown(4);
  doc.fontSize(12).text(`Issued on: ${new Date().toLocaleDateString()}`, { align: 'center' });

  doc.end();

  // convert to Buffer
  return await new Promise((resolve) => {
    const result = Buffer.concat(buffers);
    resolve(result);
  });
}
