interface Props {
  children: React.ReactNode;
}

const SubPageTemplate = ({ children }: Props) => (
  <section className="p-5">
    <div className="grid lg:grid-cols-2 gap-5">
      {children}
    </div>
  </section>
);

const Left = ({ children }: Props) => (
  <div className="grid items-center justify-center">{children}</div>
);

const Right = ({ children }: Props) => (
  <div className="p-5">{children}</div>
);

SubPageTemplate.Left = Left;
SubPageTemplate.Right = Right;

export default SubPageTemplate;