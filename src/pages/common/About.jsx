import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import { FileCopy as FileCopyIcon } from '@mui/icons-material';
import DiscordLogo from '../../assets/images/join-us-on-discord.png'; // Path to the Discord logo image in your project

function CopyLinkBox({ url }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box sx={{ border: '1px solid grey', borderRadius: 1, backgroundColor: '#ddd' }}>
        <span style={{ padding: '1rem' }}>
          {url}
        </span>
        <Button
          variant="contained"
          onClick={copyToClipboard}
          startIcon={<FileCopyIcon />}
          disabled={isCopied}
          style={{
            width: '7rem',
            borderRadius: 3,
          }}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </Button>
      </Box>
    </Box>
  );
}

CopyLinkBox.propTypes = {
  url: PropTypes.string,
};

CopyLinkBox.defaultProps = {
  url: '',
};

const styleSheet = {
  title: {
    textAlign: 'center',
    marginTop: '5rem',
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
      <MySection>
        <div style={styleSheet.title}>
          <p>
            <strong>CLICK ĐỂ THAM GIA NGAY</strong>
            &nbsp;Discord Server của Lowie&apos;s Leetcode Community!
          </p>
        </div>
        <div style={styleSheet.title}>
          <a
            href="https://discord.gg/BrSzUsWp2w"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button aria-label="discord">
              <img src={DiscordLogo} alt="Discord Logo" />
            </Button>
          </a>
        </div>
        <div style={styleSheet.title}>
          <p>
            Hoặc truy cập link:&nbsp;
          </p>
          <CopyLinkBox url="https://discord.gg/BrSzUsWp2w" />
        </div>
        <h2 style={styleSheet.title}>
          Câu chuyện khởi nguồn
        </h2>
        <div style={styleSheet.content}>
          <span>
            Câu chuyện bắt nguồn từ năm 2023, từ một buổi Seminar được tổ chức dành cho các
            anh em ở UET K66-CN8, nơi mà anh già Lowie chia sẻ với các anh em trong khóa về 2
            năm bán mình cho tư bản của anh ta.
            Trong seminar đó có nêu ra ba cách để các bạn cải thiện hồ sơ của mình trong những
            năm còn lại trên đại học:
            <ul>
              <li>Tham gia các sự kiện Hackathon, CTF, Job Fair, ...</li>
              <li>Luyện tập Cấu Giải và kỹ năng giải quyết vấn đề</li>
              <li>Tự phát triển sản phẩm và tải lên GitHub.</li>
            </ul>
          </span>
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
          </p>
          <p>
            Vào ngày 15/03/2023, Lowie&apos;s Leetcode Club chính thức được khai sinh với
            6 thành viên UET K66-CACLC1 Core Team, cùng khoảng 15 anh em khác tham gia luyện tập.
          </p>
          <p>
            Vào tháng 09/2023, Lowie&apos;s Leetcode Club đổi mô hình hoạt động sang&nbsp;
            <strong>Lowie&apos;s Leetcode Community</strong>
            , hướng đến việc phát triển cộng đồng
            lập trình, và mở cửa chào đón mọi sinh viên đang có nhu cầu luyện tập LeetCode đang
            học tập ở bất kỳ đâu.
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
            các doanh nghiệp lớn trong nước (chẳng hạn: VinAI/VinBigData, Viettel, VNG, …),
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
          <span>
            Để phục vụ sứ mệnh của CLB, các hoạt động trong CLB cũng đã và đang được triển khai
            dựa vào nhu cầu học tập của các bạn:
            <ul>
              <li>
                <strong>Monthly Awards</strong>
                : Nơi các bạn đã có kinh nghiệm có thể cạnh tranh cho những danh hiệu như
                Leetcoder of the Month. Hãy gọi
                <code>/leaderboard current</code>
                trong kênh chat
                để xem bảng xếp hạng hiện thời nhé.
              </li>
              <li>
                <strong>Daily Problem Editorial</strong>
                : Nơi các bạn mới học có thể tìm gợi ý/lời giải cho bài tập Daily trên Leetcode,
                và cũng là nơi các bạn đã có kinh nghiệm có thể tập diễn đạt, trình bày ý tưởng
                của mình cho các bạn khác trong CLB.
              </li>
              <li>
                <strong>Lowie&apos;s Leetcode Class</strong>
                : Nơi các bạn được những Expert trong cộng đồng giảng dạy về Cấu Giải và thực hành
                trên Leetcode.
              </li>
              <li>
                <strong>Bot LLC Assistant </strong>
                : Là một bot được phát triển bởi đội ngũ Bot Developers nhà LLC.
                Các bạn hãy thử gọi các lệnh sau trong kênh bot nhé:
                <ul>
                  <li><code>/gimme</code></li>
                  <li><code>/help</code></li>
                  <li><code>/quiz</code></li>
                  <li><code>/duel start</code></li>
                  <li><code>/gacha</code></li>
                  <li><code>/leaderboard current</code></li>
                </ul>
              </li>
            </ul>
          </span>
          <p>
            Các bạn có thể đọc đầy đủ về danh sách các hoạt động trong cộng đồng ở&nbsp;
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
