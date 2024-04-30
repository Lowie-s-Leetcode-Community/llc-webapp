import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import PageTitle from '../../components/PageTitle';

const styleSheet = {
  title: {
    textAlign: 'center',
    marginTop: '10rem',
  },
  content: {
    padding: '0 10%',
    textAlign: 'justify',
  },
  section: {
    marginBottom: '5rem',
    fontSize: '1.2rem',
  },
};

const variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    y: -40,
    transition: {
      type: 'fadeIn',
      duration: 0.8,
    },
    opacity: 1,
  },
};

function MySection({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      style={styleSheet.section}
    >
      { children }
    </motion.div>
  );
}

MySection.propTypes = {
  children: PropTypes.node,
};

MySection.defaultProps = {
  children: null,
};

function About() {
  return (
    <>
      <PageTitle title="About us" />
      <MySection>
        <h2 style={styleSheet.title}>
          Câu chuyện khởi nguồn
        </h2>
        <div style={styleSheet.content}>
          <p>
            Câu chuyện bắt nguồn từ một buổi Seminar được tổ chức dành cho các anh em ở UET
            K66-CN8, nơi mà anh già Lowie chia sẻ với các anh em trong khóa về 2 năm bán mình
            cho tư bản của anh ta.
            Trong seminar đó có nêu ra ba cách để các bạn cải thiện hồ sơ của mình trong những
            năm còn lại trên đại học:
            <ul>
              <li>Tham gia các sự kiện Hackathon, CTF, Job Fair, …</li>
              <li>Luyện tập Cấu Giải và kỹ năng giải quyết vấn đề</li>
              <li>Làm sản phẩm</li>
            </ul>
          </p>
          <p>
            Trong đó, việc học Cấu Giải là tối quan trọng, khi các ứng viên với kỹ năng Giải thuật
            tốt luôn được &quot;ưu ái&quot; khi phỏng vấn vào các tập đoàn công nghệ.
            Việc trở nên thực sự &quot;thành thạo&quot; được bộ môn này, nhiều người
            vẫn cho rằng là đặc quyền của dân chuyên Toán-Tin, đã được học
            code từ rất lâu trước khi lên Đại học.
          </p>
          <p>
            Lowie&apos;s Leetcode Club được sinh ra để chứng minh điều đó hoàn toàn sai.
            Để làm được điều này, chúng mình mong muốn có thể trở thành một chỗ dựa vững chắc
            cho các bạn, trong quá trình các bạn tìm kiếm những công việc đầu tiên, và
            thực thi ước mơ của mình.
            Vào ngày 15/03/2023, Lowie&apos;s Leetcode Club chính thức được khai sinh với
            6 thành viên UET K66-CACLC1 Core Team, cùng khoảng 15 anh em khác tham gia luyện tập.
          </p>
        </div>
      </MySection>
      <MySection>
        <h2 style={styleSheet.title}>
          Sứ mệnh của CLB
        </h2>
        <div style={styleSheet.content}>
          <p>
            Sứ mệnh của Lowie’s Leetcode Club ban đầu là tạo môi trường để các bạn luyện tập
            Leetcode - nền tảng các bài tập phỏng vấn dành cho các bạn giàu tham vọng đỗ được
            những doanh nghiệp, tập đoàn lớn.
          </p>
          <p>
            Tới đây, khi các bạn UET K66 - “first gen” của CLB - sẽ bước vào quá trình chuẩn bị hồ
            sơ và tìm kiếm những cơ hội đầu tiên, cũng là lúc chúng mình sẽ hoạt động mạnh mẽ nhất.
            Bằng được, mình mong muốn các bạn tham gia CLB đạt được những gì các bạn mong đợi từ lúc
            các bạn Verify tài khoản của mình. Động thái đầu tiên, chúng mình đã cho khai giảng
            Lowie’s Leetcode Class YELLOW - nơi các đơn vị kiến thức trong các bài phỏng vấn ở
            các doanh nghiệp được mình chia sẻ.
          </p>
          <p>
            Mình mong muốn, 1 năm nữa, được nhìn thấy những thành viên đầu tiên của CLB
            giành lấy được những bản hợp đồng thực tập giá trị ở
            các doanh nghiệp lớn trong nước (chẳng hạn: VinAI/VinBigData, Kyber Network, …),
            hay các doanh nghiệp nước ngoài (WorldQuant, DTL, Grab, Shopee, …).
            Thậm chí, nếu may mắn, chúng ta có thể đào tạo được những
            Thực tập sinh Google hay Amazon trong CLB của mình.
          </p>
        </div>
      </MySection>
      <MySection>
        <h2 style={styleSheet.title}>
          Các hoạt động trong CLB
        </h2>
        <div style={styleSheet.content}>
          <p>
            Để phục vụ sứ mệnh của CLB, các hoạt động trong CLB cũng đã và đang được triển khai
            dựa vào nhu cầu học tập của các bạn:
            <ul>
              <li>
                <strong>Daily Problem Editorial</strong>
                : Nơi các bạn mới học có thể tìm gợi ý/lời giải cho bài tập Daily trên Leetcode,
                và cũng là nơi các bạn đã có kinh nghiệm có thể tập diễn đạt, trình bày ý tưởng
                của mình cho các bạn khác trong CLB.
              </li>
              <li>
                <strong>Lowie&apos;s Leetcode Class</strong>
                : Nơi các bạn mới học có thể tìm gợi ý/lời giải cho bài tập Daily trên Leetcode,
                và cũng là nơi các bạn đã có kinh nghiệm có thể tập diễn đạt, trình bày ý tưởng
                của mình cho các bạn khác trong CLB.
              </li>
              <li>
                <strong>Chuyên Đề</strong>
                : Nơi tất cả thành viên trong LLC cùng luyện tập & cọ xát cho một chủ đề nào đó.
              </li>
              <li>
                <strong>Bot LC Helper </strong>
                (a.k.a. &quot;Đủ 500 bài LeetCode chưa?&quot;) : Nơi các bạn mới học có thể tìm
                gợi ý/lời giải cho bài tập Daily trên Leetcode, và cũng là nơi các bạn đã có
                kinh nghiệm có thể tập diễn đạt, trình bày ý tưởng của mình cho các bạn khác
                trong CLB.
              </li>
            </ul>
          </p>
          <p>
            Ngoài ra, chúng mình cũng có một hệ thống BẢNG XẾP HẠNG để các bạn có thể đua điểm
            với nhau, giành lấy danh hiệu Leetcoders of the Month và những phần quà giá trị khác
            từ Chủ tịch CLB.
          </p>
          <p>
            Các bạn có thể đọc đầy đủ về danh sách các hoạt động trong CLB ở&nbsp;
            <a
              href="https://hackmd.io/@lowies-leetcode-club/HkYbivnnn"
              target="_blank"
              rel="noreferrer"
            >
              ĐÂY
            </a>
            .
          </p>
        </div>
      </MySection>
    </>
  );
}

export default About;
