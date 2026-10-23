from pathlib import Path
import re
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from reportlab.pdfgen import canvas
from xml.sax.saxutils import escape

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'submission'
GROWTH=OUT/'growth_associate'
SLIDES=OUT/'revenue_intelligence_inbox'/'slides'
PLAN=GROWTH/'college_event_plan.md'

def normal(s):
    return (s.replace('\u2013','-').replace('\u2014','-').replace('\u2011','-')
            .replace('\u2018',"'").replace('\u2019',"'").replace('\u201c','"').replace('\u201d','"'))

def inline(s):
    s=escape(normal(s.strip()))
    s=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',s)
    s=re.sub(r'`(.+?)`',r'<font name="Courier">\1</font>',s)
    return s

def make_plan_pdf():
    dest=GROWTH/'college_event_plan.pdf'
    styles=getSampleStyleSheet()
    styles.add(ParagraphStyle(name='DocTitle',parent=styles['Title'],fontName='Helvetica-Bold',fontSize=23,leading=28,textColor=colors.HexColor('#14283a'),alignment=TA_LEFT,spaceAfter=13))
    styles.add(ParagraphStyle(name='H1x',parent=styles['Heading1'],fontName='Helvetica-Bold',fontSize=16,leading=19,textColor=colors.HexColor('#087e76'),spaceBefore=13,spaceAfter=7,keepWithNext=True))
    styles.add(ParagraphStyle(name='H2x',parent=styles['Heading2'],fontName='Helvetica-Bold',fontSize=12,leading=15,textColor=colors.HexColor('#26394a'),spaceBefore=8,spaceAfter=5,keepWithNext=True))
    styles.add(ParagraphStyle(name='Bodyx',parent=styles['BodyText'],fontName='Helvetica',fontSize=9.2,leading=13,textColor=colors.HexColor('#334353'),spaceAfter=6))
    styles.add(ParagraphStyle(name='Smallx',parent=styles['BodyText'],fontName='Helvetica',fontSize=7.2,leading=9,textColor=colors.HexColor('#334353')))
    story=[]; lines=PLAN.read_text(encoding='utf-8').splitlines(); i=0; first=True
    while i<len(lines):
        ln=lines[i].strip()
        if not ln: i+=1; continue
        if ln.startswith('|'):
            block=[]
            while i<len(lines) and lines[i].strip().startswith('|'):
                block.append([cell.strip() for cell in lines[i].strip().strip('|').split('|')]);i+=1
            block=[r for r in block if not all(re.fullmatch(r':?-{2,}:?',x.replace(' ','')) for x in r)]
            if block:
                ncols=max(map(len,block)); data=[]
                for row in block:
                    row=row+['']*(ncols-len(row)); data.append([Paragraph(inline(c),styles['Smallx']) for c in row])
                widths={2:[57*mm,34*mm,68*mm,25*mm],3:[28*mm,24*mm,68*mm,64*mm,0*mm],4:[48*mm,22*mm,48*mm,70*mm],5:[40*mm,35*mm,35*mm,70*mm,0*mm],7:[28*mm,23*mm,58*mm,27*mm,62*mm,0*mm,0*mm]}.get(ncols)
                if not widths: widths=[(A4[0]-38*mm)/ncols]*ncols
                widths=[w for w in widths if w>0]
                if len(widths)!=ncols: widths=[(A4[0]-38*mm)/ncols]*ncols
                tbl=Table(data,colWidths=widths,repeatRows=1,hAlign='LEFT')
                tbl.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e9f3f1')),('TEXTCOLOR',(0,0),(-1,0),colors.HexColor('#1b3d46')),('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('VALIGN',(0,0),(-1,-1),'TOP'),('GRID',(0,0),(-1,-1),.35,colors.HexColor('#dbe3e6')),('LEFTPADDING',(0,0),(-1,-1),5),('RIGHTPADDING',(0,0),(-1,-1),5),('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,colors.HexColor('#fafbfc')])]))
                story.extend([Spacer(1,3),tbl,Spacer(1,8)])
            continue
        if ln.startswith('# '):
            story.append(Paragraph(inline(ln[2:]),styles['DocTitle'] if first else styles['H1x']));first=False;i+=1;continue
        if ln.startswith('## '): story.append(Paragraph(inline(ln[3:]),styles['H1x']));i+=1;continue
        if ln.startswith('### '): story.append(Paragraph(inline(ln[4:]),styles['H2x']));i+=1;continue
        if ln.startswith('- '):
            story.append(Paragraph('- '+inline(ln[2:]),styles['Bodyx']));i+=1;continue
        if re.match(r'^\d+\.\s',ln):
            story.append(Paragraph(inline(ln),styles['Bodyx']));i+=1;continue
        story.append(Paragraph(inline(ln),styles['Bodyx']));i+=1
    def footer(c,doc):
        c.saveState();w,h=A4;c.setStrokeColor(colors.HexColor('#dfe6e8'));c.line(19*mm,15*mm,w-19*mm,15*mm);c.setFont('Helvetica',7);c.setFillColor(colors.HexColor('#7a8793'));c.drawString(19*mm,10*mm,'PROPOSED EVENT PLAN  |  ESTIMATES AND APPROVALS NOT CONFIRMED');c.drawRightString(w-19*mm,10*mm,str(doc.page));c.restoreState()
    doc=SimpleDocTemplate(str(dest),pagesize=A4,rightMargin=19*mm,leftMargin=19*mm,topMargin=17*mm,bottomMargin=21*mm,title='Campus Project & Innovation Showcase 2027 - Proposal',author='Candidate submission')
    doc.build(story,onFirstPage=footer,onLaterPages=footer)
    return dest

def make_slide_pdf():
    dest=SLIDES/'revenue-intelligence-review.pdf';slides=[ROOT/'tmp/presentations'/f'slide-{i:02}.png' for i in range(1,6)]
    page=landscape((960,540));c=canvas.Canvas(str(dest),pagesize=page,pageCompression=1)
    c.setTitle('Revenue Intelligence Inbox - Product Review');c.setAuthor('Candidate submission')
    for img in slides:
        c.drawImage(str(img),0,0,width=page[0],height=page[1],preserveAspectRatio=True,anchor='c',mask='auto');c.showPage()
    c.save();return dest

if __name__=='__main__':
    print('Created',make_plan_pdf());print('Created',make_slide_pdf())
