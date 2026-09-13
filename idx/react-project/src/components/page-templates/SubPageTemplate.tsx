interface Props {
  children: React.ReactNode;
}

const SubPageTemplate = ({ children }: Props) => (
  <section className="py-2">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {children}
    </div>
  </section>
);

const Left = ({ children }: Props) => (
  <div className="py-5">{children}</div>
);

const Right = ({ children }: Props) => (
  <div className="py-5">{children}</div>
);

SubPageTemplate.Left = Left;
SubPageTemplate.Right = Right;

export default SubPageTemplate;